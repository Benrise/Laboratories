from django.contrib import admin
from .models import Publication, Filmwork, PublicationFilmwork, Person, PersonFilmwork


class PublicationFilmworkInline(admin.TabularInline):
    model = PublicationFilmwork


class PersonFilmworkInline(admin.TabularInline):
    model = PersonFilmwork


@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    search_fields = ('name', 'description', 'id',)


@admin.register(Filmwork)
class FilmworkAdmin(admin.ModelAdmin):
    inlines = (PublicationFilmworkInline,)

    list_display = ('title', 'type', 'created_at', 'rating',)

    list_filter = ('type',)

    search_fields = ('title', 'description', 'id',)


@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    inlines = (PersonFilmworkInline,)

    list_display = ('full_name', 'created_at',)

    search_fields = ('full_name', 'id',)
