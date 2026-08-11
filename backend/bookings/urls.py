from django.urls import path
from .views import AvailabilityView, BookingListCreateView

urlpatterns = [
    path('', BookingListCreateView.as_view(), name='booking-list-create'),
    path('availability/', AvailabilityView.as_view(), name='availability-detail'),
]