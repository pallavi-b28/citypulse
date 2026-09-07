from django.contrib import admin
from .models import Complaint


@admin.register(Complaint)
class ComplaintAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "title",
        "category",
        "status",
        "location",
        "created_at",
    )

    list_filter = (
        "status",
        "category",
    )

    search_fields = (
        "title",
        "location",
        "description",
    )

    ordering = (
        "-created_at",
    )