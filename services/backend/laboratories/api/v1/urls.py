from django.urls import path

from laboratories.api.v1 import views

urlpatterns = [
    path('laboratories/', views.MoviesListApi.as_view()),
    path('laboratories/<uuid:pk>', views.MoviesDetailApi.as_view()),
]
