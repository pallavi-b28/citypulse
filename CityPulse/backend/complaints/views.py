from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Complaint, Reminder
from .serializers import ComplaintSerializer


# ==========================================
# List & Create Complaints
# ==========================================

class ComplaintListCreateView(generics.ListCreateAPIView):
    queryset = Complaint.objects.all().order_by("-created_at")
    serializer_class = ComplaintSerializer


# ==========================================
# View / Delete Complaint
# ==========================================

class ComplaintDetailView(generics.RetrieveDestroyAPIView):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer


# ==========================================
# Update Status
# ==========================================

@api_view(["PATCH"])
def update_status(request, pk):

    try:
        complaint = Complaint.objects.get(pk=pk)

    except Complaint.DoesNotExist:
        return Response(
            {"error": "Complaint not found"},
            status=status.HTTP_404_NOT_FOUND,
        )

    complaint.status = request.data.get(
        "status",
        complaint.status,
    )

    complaint.save()

    return Response(
        ComplaintSerializer(complaint).data
    )


# ==========================================
# Update Department
# ==========================================

@api_view(["PATCH"])
def update_department(request, pk):

    try:
        complaint = Complaint.objects.get(pk=pk)

    except Complaint.DoesNotExist:
        return Response(
            {"error": "Complaint not found"},
            status=status.HTTP_404_NOT_FOUND,
        )

    complaint.department = request.data.get(
        "department",
        complaint.department,
    )

    complaint.save()

    return Response(
        ComplaintSerializer(complaint).data
    )


# ==========================================
# Submit Feedback
# ==========================================

@api_view(["PATCH"])
def submit_feedback(request, pk):

    try:
        complaint = Complaint.objects.get(pk=pk)

    except Complaint.DoesNotExist:
        return Response(
            {"error": "Complaint not found"},
            status=status.HTTP_404_NOT_FOUND,
        )

    complaint.rating = request.data.get(
        "rating",
        complaint.rating,
    )

    complaint.feedback = request.data.get(
        "feedback",
        complaint.feedback,
    )

    complaint.save()

    return Response(
        ComplaintSerializer(complaint).data
    )
# -------------------------
# Send Reminder
# -------------------------

@api_view(["POST"])
def send_reminder(request, pk):

    try:
        complaint = Complaint.objects.get(pk=pk)

    except Complaint.DoesNotExist:
        return Response(
            {"error": "Complaint not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    Reminder.objects.create(
        complaint=complaint
    )

    return Response(
        {
            "message": "Reminder sent successfully.",
            "reminder_count": complaint.reminders.count(),
            "last_reminder": complaint.reminders.latest("created_at").created_at
        },
        status=status.HTTP_201_CREATED
    )


# ==========================================
# Save Resolution
# ==========================================

@api_view(["PATCH"])
def update_resolution(request, pk):

    try:
        complaint = Complaint.objects.get(pk=pk)

    except Complaint.DoesNotExist:
        return Response(
            {"error": "Complaint not found"},
            status=status.HTTP_404_NOT_FOUND,
        )

    complaint.resolution_note = request.data.get(
        "resolution_note",
        complaint.resolution_note,
    )

    complaint.status = request.data.get(
        "status",
        complaint.status,
    )

    complaint.save()

    return Response(
        ComplaintSerializer(complaint).data
    )