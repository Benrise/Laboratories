import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _


class Role(models.TextChoices):
    HEAD = 'head', _('Head')
    STAFF = 'staff', _('Staff')
    INTERN = 'intern', _('Intern')


class ActivityType(models.TextChoices):
    SCIENTIFIC = "scientific", _("Scientific")
    EDUCATIONAL = "educational", _("Educational")
    PRODUCTION = "production", _("Production")
    EXPERIMENTAL = "experimental", _("Experimental")


class PublicationRole(models.TextChoices):
    AUTHOR = 'author', _('Author')
    EDITOR = 'editor', _('Editor')
    REVIEWER = 'reviewer', _('Reviewer')


class TimeStampedMixin(models.Model):
    created_at = models.DateTimeField(_('created_at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated_at'), auto_now=True)

    class Meta:
        abstract = True


class UUIDMixin(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    class Meta:
        abstract = True


class Publication(UUIDMixin, TimeStampedMixin):
    name = models.CharField(_('name'), max_length=255)
    description = models.TextField(_('description'), blank=True, null=True)
    persons = models.ManyToManyField('Person', through='PublicationPerson', related_name='publications', null=True)

    class Meta:
        db_table = "content\".\"publication"
        verbose_name = _('publication')
        verbose_name_plural = _('publications')

    def __str__(self):
        return self.name


class Person(UUIDMixin, TimeStampedMixin):
    full_name = models.CharField(_('fullname'), max_length=255)

    class Meta:
        db_table = "content\".\"person"
        verbose_name = _('person')
        verbose_name_plural = _('persons')

    def __str__(self):
        return self.full_name


class Laboratory(UUIDMixin, TimeStampedMixin):
    title = models.CharField(_('name'), max_length=255)
    description = models.TextField(_('description'), blank=True, null=True)
    creation_date = models.DateField(_('creation_date'), blank=True, null=True)
    activity_type = models.CharField(_('activity_type'), max_length=128, choices=ActivityType.choices)
    publications = models.ManyToManyField(Publication, through='PublicationLaboratory', null=True)
    persons = models.ManyToManyField(Person, through='PersonLaboratory', null=True)

    class Meta:
        db_table = "content\".\"laboratory"
        verbose_name = _('laboratory')
        verbose_name_plural = _('laboratories')

    def __str__(self):
        return self.title


class PublicationLaboratory(UUIDMixin):
    laboratory = models.ForeignKey('Laboratory', on_delete=models.CASCADE,
                                   verbose_name=_('laboratory'))
    publication = models.ForeignKey('Publication', on_delete=models.CASCADE,
                                    verbose_name=_('publication'))
    created_at = models.DateTimeField(_('created_at'), auto_now_add=True)

    class Meta:
        db_table = "content\".\"publication_laboratory"
        verbose_name = _('publication_laboratory')
        verbose_name_plural = _('publication_laboratories')
        unique_together = ['publication', 'laboratory']


class PersonLaboratory(UUIDMixin):
    laboratory = models.ForeignKey('Laboratory', on_delete=models.CASCADE,
                                   verbose_name=_('laboratory'))
    person = models.ForeignKey('Person', on_delete=models.CASCADE,
                               verbose_name=_('person'))
    role = models.CharField(_('role'), max_length=20, choices=Role.choices)
    created_at = models.DateTimeField(_('created_at'), auto_now_add=True)

    class Meta:
        db_table = "content\".\"person_laboratory"
        verbose_name = _('person_laboratory')
        verbose_name_plural = _('person_laboratories')
        unique_together = ['laboratory', 'person', 'role']


class PublicationPerson(UUIDMixin):
    publication = models.ForeignKey('Publication', on_delete=models.CASCADE, verbose_name=_('publication'))
    person = models.ForeignKey('Person', on_delete=models.CASCADE, verbose_name=_('person'))
    role = models.CharField(_('role'), max_length=20, choices=PublicationRole.choices)
    created_at = models.DateTimeField(_('created_at'), auto_now_add=True)

    class Meta:
        db_table = "content\".\"publication_person"
        verbose_name = _('publication_person')
        verbose_name_plural = _('publication_persons')
        unique_together = ['publication', 'person', 'role']
