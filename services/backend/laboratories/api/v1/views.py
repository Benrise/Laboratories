from django.http import JsonResponse
from django.views.generic.list import BaseListView
from django.views.generic.detail import BaseDetailView
from django.db.models import Q
from django.contrib.postgres.aggregates import ArrayAgg

from laboratories.models import Laboratory, Role


class LaboratoryApiMixin:
    model = Laboratory
    http_method_names = ['get']

    def get_queryset(self):
        qs = Laboratory.objects.prefetch_related('publications', 'persons').values().annotate(
            publications=ArrayAgg(
                'publications__name',
                distinct=True
            ),
            heads=ArrayAgg(
                'persons__full_name',
                distinct=True,
                filter=Q(personlaboratory__role=Role.HEAD),
            ),
            iterns=ArrayAgg(
                'persons__full_name',
                distinct=True,
                filter=Q(personlaboratory__role=Role.INTERN),
            ),
            staffs=ArrayAgg(
                'persons__full_name',
                distinct=True,
                filter=Q(personlaboratory__role=Role.STAFF),
            ),
        )
        return qs

    def render_to_response(self, context, **response_kwargs):
        return JsonResponse(context)


class LaboratoriesListApi(LaboratoryApiMixin, BaseListView):
    paginate_by = 50

    def get_context_data(self, *, object_list=None, **kwargs):
        qs = self.get_queryset()
        paginator, page, queryset, is_paginated = self.paginate_queryset(
            qs,
            self.paginate_by
        )
        context = {
            'count': paginator.count,
            'total_pages': page.paginator.num_pages,
            'prev': page.previous_page_number() if page.number > 1 else None,
            'next': page.next_page_number() if page.has_next() else None,
            'results': list(queryset),
        }
        return context


class LaboratoriesDetailApi(LaboratoryApiMixin, BaseDetailView):    
    def get_context_data(self, **kwargs):
        return self.get_object()
