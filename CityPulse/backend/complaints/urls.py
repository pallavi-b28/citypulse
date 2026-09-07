from django.urls import path

from .views import (
    ComplaintListCreateView,
    ComplaintDetailView,
    update_status,
    update_department,
    submit_feedback,
    send_reminder,
    update_resolution,
)

urlpatterns = [

    # List all complaints & create complaint
    path(
        "",
        ComplaintListCreateView.as_view(),
        name="complaints",
    ),

    # View one complaint / Delete complaint
    path(
        "<int:pk>/",
        ComplaintDetailView.as_view(),
        name="complaint-detail",
    ),

    # Update status
    path(
        "<int:pk>/status/",
        update_status,
        name="update-status",
    ),

    # Update department
    path(
        "<int:pk>/department/",
        update_department,
        name="update-department",
    ),

    # Submit feedback
    path(
        "<int:pk>/feedback/",
        submit_feedback,
        name="submit-feedback",
    ),

    # Send reminder
    path(
        "<int:pk>/reminder/",
        send_reminder,
        name="send-reminder",
    ),

    # Save resolution
    path(
        "<int:pk>/resolution/",
        update_resolution,
        name="update-resolution",
    ),

]