from django.urls import path, include
from base.views import product_views

urlpatterns = [
    path('', product_views.getProducts, name='products'),
    path('<str:search>/search/', product_views.searchProducts, name='search-products'),
    path('create/', product_views.createProduct, name='products-create'),
    path('top/', product_views.getTopProduct, name='top-products'),

    path('<int:pk>/reviews/', product_views.createProductReview, name='create-review'),
    path('<int:pk>/', product_views.getProduct, name='product'),

    path('<int:pk>/delete/', product_views.deleteProduct, name='product-delete'),
    path('<int:pk>/update/', product_views.updateProduct, name='product-update'),
]
