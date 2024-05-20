from django.urls import path

from laboratories.api.v1 import views

urlpatterns = [
    path('laboratories/', views.LaboratoriesListApi.as_view()),
    path('laboratories/<uuid:pk>', views.LaboratoriesDetailApi.as_view()),
]
