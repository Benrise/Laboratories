from django.contrib import admin
from .models import Publication, Laboratory, PublicationLaboratory, Person, PersonLaboratory


class PublicationLaboratoryInline(admin.TabularInline):
    model = PublicationLaboratory


class PersonLaboratoryInline(admin.TabularInline):
    model = PersonLaboratory


@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    search_fields = ('name', 'description', 'id',)


@admin.register(Laboratory)
class LaboratoryAdmin(admin.ModelAdmin):
    inlines = (PublicationLaboratoryInline,)

    list_display = ('title', 'activity_type', 'created_at')

    list_filter = ('activity_type',)

    search_fields = ('title', 'description', 'id',)


@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    inlines = (PersonLaboratoryInline,)

    list_display = ('full_name', 'created_at',)

    search_fields = ('full_name', 'id',)
