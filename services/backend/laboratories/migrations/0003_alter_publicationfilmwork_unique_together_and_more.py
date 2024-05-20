# Generated by Django 4.2.5 on 2024-02-12 21:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('laboratories', '0002_filmwork_persons'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='publicationfilmwork',
            unique_together={('publication', 'film_work')},
        ),
        migrations.AlterUniqueTogether(
            name='personfilmwork',
            unique_together={('film_work', 'person', 'role')},
        ),
    ]