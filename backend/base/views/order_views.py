from datetime import datetime
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from rest_framework.pagination import PageNumberPagination

from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import OrderSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # (1) Create order
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod']['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],
        )
        # (2) Create shipping address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )
        # (3) Create order items and set order to orderItem relationship
        for orderItem in orderItems:
            product = Product.objects.get(id=orderItem['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=orderItem['qty'],
                price=orderItem['price'],
                image=product.image
            )
            # (4) Update stock
            product.countInStock -= item.qty
            product.save()
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user
    try:
        order = get_object_or_404(Order, id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False,  context={'request':request})
            return Response(serializer.data)
        else:
            return Response({'detail': 'No authorized to view this order'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    order = user.order_set.select_related('user').all()
    serializer = OrderSerializer(order, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.select_related('user').all()
    paginator = PageNumberPagination()
    paginator.page_size = 4
    paginated_orders = paginator.paginate_queryset(orders, request)
    serializer = OrderSerializer(paginated_orders, many=True, context={'request': request})
    return paginator.get_paginated_response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = get_object_or_404(Order, id=pk)
    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    return Response('Order was paid')


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToDelivered(request, pk):
    order = get_object_or_404(Order, id=pk)
    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()
    return Response('Order was delivered')
