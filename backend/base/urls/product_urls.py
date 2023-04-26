from django.urls import path, include
from base.views import product_views

urlpatterns = [
    path('', product_views.getProducts, name='products'),
    path('create/', product_views.createProduct, name='products-create'),
    path('upload/', product_views.uploadImage, name='image-upload'),
    path('top/', product_views.getTopProduct, name='top-products'),

    path('<str:pk>/reviews/', product_views.createProductReview, name='create-review'),
    path('<str:pk>/', product_views.getProduct, name='product'),

    path('delete/<str:pk>/', product_views.deleteProduct, name='product-delete'),
    path('<str:pk>/update/', product_views.updateProduct, name='product-update'),
]
