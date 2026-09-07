from django.db import models


class Complaint(models.Model):

    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("In Progress", "In Progress"),
        ("Resolved", "Resolved"),
    ]

    CATEGORY_CHOICES = [
        ("Pothole", "Pothole"),
        ("Garbage", "Garbage"),
        ("Street Light", "Street Light"),
        ("Water Leakage", "Water Leakage"),
        ("Drainage", "Drainage"),
        ("Road Damage", "Road Damage"),
        ("Traffic Signal", "Traffic Signal"),
        ("Other", "Other"),
    ]

    DEPARTMENT_CHOICES = [
        ("Road Department", "Road Department"),
        ("Sanitation Department", "Sanitation Department"),
        ("Water Department", "Water Department"),
        ("Electrical Department", "Electrical Department"),
        ("Traffic Department", "Traffic Department"),
        ("General", "General"),
    ]

    title = models.CharField(max_length=200)

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES
    )

    description = models.TextField()

    location = models.CharField(max_length=255)

    image = models.ImageField(
        upload_to="complaints/",
        blank=True,
        null=True
    )

    department = models.CharField(
        max_length=100,
        choices=DEPARTMENT_CHOICES,
        default="General"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Pending"
    )

    resolution_note = models.TextField(
        blank=True,
        null=True
    )

    rating = models.IntegerField(
        blank=True,
        null=True
    )

    feedback = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title


class Reminder(models.Model):

    complaint = models.ForeignKey(
        Complaint,
        on_delete=models.CASCADE,
        related_name="reminders"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"Reminder #{self.id} - Complaint {self.complaint.id}"