# Generated by Django 4.2.5 on 2024-05-20 18:47

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):
    dependencies = [
        ("laboratories", "0004_alter_laboratory_creation_date_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="PublicationPerson",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                (
                    "role",
                    models.CharField(
                        choices=[
                            ("author", "Author"),
                            ("editor", "Editor"),
                            ("reviewer", "Reviewer"),
                        ],
                        max_length=20,
                        verbose_name="role",
                    ),
                ),
                (
                    "created_at",
                    models.DateTimeField(auto_now_add=True, verbose_name="created_at"),
                ),
                (
                    "person",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="laboratories.person",
                        verbose_name="person",
                    ),
                ),
                (
                    "publication",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="laboratories.publication",
                        verbose_name="publication",
                    ),
                ),
            ],
            options={
                "verbose_name": "publication_person",
                "verbose_name_plural": "publication_persons",
                "db_table": 'content"."publication_person',
                "unique_together": {("publication", "person", "role")},
            },
        ),
        migrations.AddField(
            model_name="publication",
            name="persons",
            field=models.ManyToManyField(
                null=True,
                related_name="publications",
                through="laboratories.PublicationPerson",
                to="laboratories.person",
            ),
        ),
    ]