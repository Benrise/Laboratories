from django.urls import path

from laboratories.api.v1 import views

urlpatterns = [
    path('laboratories/', views.LaboratoriesListApi.as_view()),
    path('laboratories/<uuid:pk>', views.LaboratoriesDetailApi.as_view()),
    path('persons/', views.PersonsListApi.as_view(), name='persons_list'),
    path('persons/<uuid:pk>/', views.PersonsDetailApi.as_view(), name='person_detail'),
    path('publications/', views.PublicationsListApi.as_view(), name='publications_list'),
    path('publications/<uuid:pk>/', views.PublicationsDetailApi.as_view(), name='publication_detail'),
]