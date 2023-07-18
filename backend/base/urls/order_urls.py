from django.urls import path, include
from base.views import order_views

urlpatterns = [
    path('', order_views.getOrders, name='orders'),
    path('add/', order_views.addOrderItems, name='orders-add'),
    path('myorders/', order_views.getMyOrders, name='myorders'),

    path('<int:pk>/', order_views.getOrderById, name='user-order'),
    path('<int:pk>/pay/', order_views.updateOrderToPaid, name='pay'),
    path('<int:pk>/deliver/', order_views.updateOrderToDelivered, name='deliver'),
]
