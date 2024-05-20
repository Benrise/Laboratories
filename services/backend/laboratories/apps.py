from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class MoviesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'laboratories'
    verbose_name = _('laboratories')

    def ready(self):
        import laboratories.signals
