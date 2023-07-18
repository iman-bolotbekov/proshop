import json
from decimal import Decimal
from django.db.models import Avg
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from rest_framework.pagination import PageNumberPagination

from base.models import Product, Review
from base.serializers import ProductSerializer, ProductDetailSerializer


@api_view(['GET'])
def getProduct(request, pk):
    product = get_object_or_404(Product, id=pk)
    serializer = ProductDetailSerializer(product, many=False, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all().order_by('id')
    paginator = PageNumberPagination()
    paginator.page_size = 4
    paginated_listings = paginator.paginate_queryset(products, request)
    serializer = ProductSerializer(paginated_listings, many=True,  context={'request': request})
    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
def searchProducts(request, search):
    searchedProducts = Product.objects.filter(name__icontains=search)
    serializer = ProductSerializer(searchedProducts, many=True, context={'request':request})
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    data = request.data

    product = Product.objects.create(
        user=user,
        name=data['name'],
        price=data['price'],
        brand=data['brand'],
        category=data['category'],
        countInStock=data['countInStock'],
        image=data['image'],
        description=data['description']
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    get_object_or_404(Product, id=pk).delete()
    return Response('Product was deleted!')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    product = Product.objects.get(id=pk)
    data = request.data
    product.name = data['name']
    product.price = Decimal(json.loads(data['price']))
    product.brand = data['brand']
    product.category = data['category']
    product.countInStock = data['countInStock']
    product.description = data['description']
    product.image = data['image']
    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = get_object_or_404(Product, id=pk)
    data = request.data
    Review.objects.create(
        user=user,
        product=product,
        name=user.first_name,
        rating=data['rating'],
        comment=data['comment']
    )
    reviews = product.review_set.all()
    product.numReviews = reviews.count()
    product.rating = reviews.aggregate(Avg('rating'))['rating__avg']
    product.save()
    return Response('Review Added')


@api_view(['GET'])
def getTopProduct(request):
    topProducts = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(topProducts, many=True,  context={'request':request})
    return Response(serializer.data)
