from rest_framework import serializers
from .models import Complaint, Reminder


class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = "__all__"


class ComplaintSerializer(serializers.ModelSerializer):
    reminder_count = serializers.SerializerMethodField()
    last_reminder = serializers.SerializerMethodField()

    class Meta:
        model = Complaint
        fields = [
            "id",
            "title",
            "category",
            "description",
            "location",
            "image",
            "department",
            "status",
            "resolution_note",
            "rating",
            "feedback",
            "created_at",
            "reminder_count",
            "last_reminder",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "reminder_count",
            "last_reminder",
        ]

    def get_reminder_count(self, obj):
        return obj.reminders.count()

    def get_last_reminder(self, obj):
        last = obj.reminders.order_by("-created_at").first()
        if last:
            return last.created_at
        return None