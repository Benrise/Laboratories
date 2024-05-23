from django.http import JsonResponse
from django.views.generic.list import BaseListView
from django.views.generic.detail import BaseDetailView
from django.db.models import Q
from django.contrib.postgres.aggregates import ArrayAgg

from laboratories.models import (
    Laboratory,
    Publication,
    PublicationRole,
    Role,
    Person,
    News,
)


class LaboratoryApiMixin:
    model = Laboratory
    http_method_names = ["get"]

    def get_queryset(self):
        qs = (
            Laboratory.objects.prefetch_related("publications", "persons")
            .values()
            .annotate(
                publications=ArrayAgg("publications__name", distinct=True),
                heads=ArrayAgg(
                    "persons__full_name",
                    distinct=True,
                    filter=Q(personlaboratory__role=Role.HEAD),
                ),
                iterns=ArrayAgg(
                    "persons__full_name",
                    distinct=True,
                    filter=Q(personlaboratory__role=Role.INTERN),
                ),
                staffs=ArrayAgg(
                    "persons__full_name",
                    distinct=True,
                    filter=Q(personlaboratory__role=Role.STAFF),
                ),
            )
        )
        return qs

    def render_to_response(self, context, **response_kwargs):
        return JsonResponse(context)


class LaboratoriesListApi(LaboratoryApiMixin, BaseListView):
    paginate_by = 50

    def get_context_data(self, *, object_list=None, **kwargs):
        qs = self.get_queryset()
        paginator, page, queryset, is_paginated = self.paginate_queryset(
            qs, self.paginate_by
        )
        context = {
            "count": paginator.count,
            "total_pages": page.paginator.num_pages,
            "prev": page.previous_page_number() if page.number > 1 else None,
            "next": page.next_page_number() if page.has_next() else None,
            "results": list(queryset),
        }
        return context


class LaboratoriesDetailApi(LaboratoryApiMixin, BaseDetailView):
    def get_context_data(self, **kwargs):
        return self.get_object()


class PersonApiMixin:
    model = Person
    http_method_names = ["get"]

    def get_queryset(self):
        qs = (
            Person.objects.prefetch_related(
                "personlaboratory_set__laboratory",
                "publications__publicationlaboratory_set__laboratory",
            )
            .annotate(
                laboratory_titles=ArrayAgg(
                    "personlaboratory__laboratory__title", distinct=True
                ),
                publication_titles=ArrayAgg(
                    "publications__publicationlaboratory__laboratory__title",
                    distinct=True,
                ),
            )
            .values()
        )
        return qs

    def render_to_response(self, context, **response_kwargs):
        return JsonResponse(context)


class PersonsListApi(PersonApiMixin, BaseListView):
    paginate_by = 50

    def get_context_data(self, *, object_list=None, **kwargs):
        qs = self.get_queryset()
        paginator, page, queryset, is_paginated = self.paginate_queryset(
            qs, self.paginate_by
        )
        context = {
            "count": paginator.count,
            "total_pages": page.paginator.num_pages,
            "prev": page.previous_page_number() if page.number > 1 else None,
            "next": page.next_page_number() if page.has_next() else None,
            "results": list(queryset),
        }
        return context


class PersonsDetailApi(PersonApiMixin, BaseDetailView):
    def get_context_data(self, **kwargs):
        return self.get_object()


class PublicationApiMixin:
    model = Publication
    http_method_names = ["get"]

    def get_queryset(self):
        qs = (
            super()
            .get_queryset()
            .prefetch_related("persons")
            .values()
            .annotate(
                authors=ArrayAgg(
                    "persons__full_name",
                    distinct=True,
                    filter=Q(publicationperson__role=PublicationRole.AUTHOR),
                ),
                editors=ArrayAgg(
                    "persons__full_name",
                    distinct=True,
                    filter=Q(publicationperson__role=PublicationRole.EDITOR),
                ),
                reviewers=ArrayAgg(
                    "persons__full_name",
                    distinct=True,
                    filter=Q(publicationperson__role=PublicationRole.REVIEWER),
                ),
            )
        )
        return qs

    def render_to_response(self, context, **response_kwargs):
        return JsonResponse(context)


class PublicationsListApi(PublicationApiMixin, BaseListView):
    paginate_by = 50

    def get_queryset(self):
        qs = super().get_queryset()
        query_param = self.request.GET.get("query")
        if query_param and query_param.strip():
            qs = qs.filter(name__icontains=query_param)
        return qs

    def get_context_data(self, *, object_list=None, **kwargs):
        qs = self.get_queryset()
        paginator, page, queryset, is_paginated = self.paginate_queryset(
            qs, self.paginate_by
        )
        context = {
            "count": paginator.count,
            "total_pages": page.paginator.num_pages,
            "prev": page.previous_page_number() if page.number > 1 else None,
            "next": page.next_page_number() if page.has_next() else None,
            "results": list(queryset),
        }
        return context


class PublicationsDetailApi(PublicationApiMixin, BaseDetailView):
    def get_context_data(self, **kwargs):
        return self.get_object()


class NewsListApi(BaseListView):

    model = News
    http_method_names = ["get"]
    paginate_by = 50

    def get_queryset(self):
        return News.objects.all()

    def get_context_data(self, *, object_list=None, **kwargs):
        qs = self.get_queryset().order_by("-created_at")
        paginator, page, queryset, is_paginated = self.paginate_queryset(
            qs, self.paginate_by
        )
        results = [
            {
                "id": n.id,
                "title": n.title,
                "short_content": n.short_content,
                "created_at": n.created_at.strftime("%H:%M %d.%m.%Y"),
                "picture": n.picture.url if n.picture else None,
            }
            for n in queryset
        ]
        context = {
            "count": paginator.count,
            "total_pages": page.paginator.num_pages,
            "prev": page.previous_page_number() if page.number > 1 else None,
            "next": page.next_page_number() if page.has_next() else None,
            "results": results,
        }
        return context

    def render_to_response(self, context, **response_kwargs):
        return JsonResponse(context)


class NewsDetailApi(BaseDetailView):

    model = News
    http_method_names = ["get"]

    def get_queryset(self):
        return News.objects.all()

    def get_context_data(self, *, object_list=None, **kwargs):
        obj = self.get_object()
        return {
            "id": obj.id,
            "title": obj.title,
            "content": obj.content,
            "author": obj.author,
            "created_at": obj.created_at.strftime("%H:%M %d.%m.%Y"),
            "picture": obj.picture.url if obj.picture else None,
        }

    def render_to_response(self, context, **response_kwargs):
        return JsonResponse(context)


class LaboratoryPersonsApi(BaseDetailView):
    model = Laboratory
    http_method_names = ["get"]

    def get_queryset(self):
        return Laboratory.objects.all()

    def get_context_data(self, **kwargs):
        laboratory = self.get_object()

        heads = Person.objects.filter(
            personlaboratory__laboratory=laboratory, personlaboratory__role=Role.HEAD
        ).values_list('id', 'full_name', 'photo')

        interns = Person.objects.filter(
            personlaboratory__laboratory=laboratory, personlaboratory__role=Role.INTERN
        ).values_list('id', 'full_name', 'photo')

        staffs = Person.objects.filter(
            personlaboratory__laboratory=laboratory, personlaboratory__role=Role.STAFF
        ).values_list('id', 'full_name', 'photo')

        return {
            "laboratory_id": laboratory.id,
            "laboratory_name": laboratory.title,
            "heads": list(heads),
            "interns": list(interns),
            "staffs": list(staffs),
        }

    def render_to_response(self, context, **response_kwargs):
        return JsonResponse(context)