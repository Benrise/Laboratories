from django.contrib import admin
from .models import (
    Publication,
    Laboratory,
    PublicationLaboratory,
    Person,
    PersonLaboratory,
    PublicationPerson,
    News,
)
from markdownx.admin import MarkdownxModelAdmin


class PublicationLaboratoryInline(admin.TabularInline):
    model = PublicationLaboratory
    extra = 1


class PersonLaboratoryInline(admin.TabularInline):
    model = PersonLaboratory
    extra = 1


class PublicationPersonInline(admin.TabularInline):
    model = PublicationPerson
    extra = 1


@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    search_fields = (
        "name",
        "description",
        "id",
    )
    inlines = (PublicationPersonInline,)


@admin.register(Laboratory)
class LaboratoryAdmin(admin.ModelAdmin):
    inlines = (
        PublicationLaboratoryInline,
        PersonLaboratoryInline,
    )
    list_display = ("title", "activity_type", "created_at", "photo")
    list_filter = ("activity_type",)
    search_fields = (
        "title",
        "description",
        "id",
    )


@admin.register(Person)
class PersonAdmin(MarkdownxModelAdmin):
    inlines = (
        PersonLaboratoryInline,
        PublicationPersonInline,
    )
    list_display = (
        "full_name",
        "created_at",
        "photo",
        "description",
    )
    search_fields = (
        "full_name",
        "id",
    )

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "created_at")
    search_fields = ("id", "title", "content")
