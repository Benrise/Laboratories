# Generated by Django 4.2.5 on 2024-05-22 19:35

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('laboratories', '0005_publicationperson_publication_persons'),
    ]

    operations = [
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.TextField(verbose_name='Title')),
                ('short_content', models.TextField(verbose_name='Short content')),
                ('content', models.TextField(verbose_name='Content')),
                ('picture', models.FileField(blank=True, null=True, upload_to='static/news_pictures', verbose_name='Picture')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='created_at')),
            ],
            options={
                'verbose_name': 'news',
                'verbose_name_plural': 'news',
                'db_table': 'content"."news',
            },
        ),
    ]
