import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import type { Appointment } from '@prisma/client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Stethoscope, FileText, Phone } from 'lucide-react';

export default async function BookingsPage() {
  const { userId } = await auth();

  // NOT LOGGED IN - Redirect to sign in
  if (!userId) {
    redirect('/sign-in');
  }

  // Fetch user's appointments from database
  const appointments = await prisma.appointment.findMany({
    where: { patientId: userId },
    orderBy: { date: 'asc' },
  });

  // Separate into upcoming and past
  const now = new Date();
  const upcoming = appointments.filter((apt: Appointment) => apt.date >= now && apt.status !== 'CANCELLED');
  const past = appointments.filter((apt: Appointment) => apt.date < now || apt.status === 'CANCELLED');

  return (
    <div className="max-w-4xl mx-auto p-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">My Bookings</h1>
        <p className="text-gray-600 mt-1">View your scheduled appointments</p>
      </div>

      {/* How to Book Card */}
      {appointments.length === 0 && (
        <Card className="border-gray-200 mb-8 bg-blue-50">
          <CardContent className="py-8">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black mb-2">How to Schedule an Appointment</h3>
                <p className="text-gray-700 mb-4">
                  To book a consultation, please call our clinic directly. Our staff will help you 
                  find a suitable time and assign the best doctor for your needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2 text-blue-700 font-medium">
                    <Phone className="w-4 h-4" />
                    +852 1234 5678
                  </div>
                  <div className="text-gray-600 text-sm">
                    Mon-Fri: 8:00 AM - 6:00 PM
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Appointments State */}
      {appointments.length === 0 && (
        <Card className="border-gray-200">
          <CardContent className="py-12 text-center">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-black mb-2">No appointments yet</h3>
            <p className="text-gray-600">
              Call us to schedule your first consultation. Your appointments will appear here once confirmed.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Appointments */}
      {upcoming.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-black mb-4">Upcoming Appointments</h2>
          <div className="space-y-4">
            {upcoming.map((appointment) => (
              <Card key={appointment.id} className="border-gray-200">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <CardTitle className="text-lg text-black">{appointment.procedure}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <User className="w-4 h-4" />
                        Dr. {appointment.doctorName}
                      </CardDescription>
                    </div>
                    <Badge 
                      variant="default"
                      className="w-fit bg-black text-white"
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      {appointment.date.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-4 h-4 text-gray-500" />
                      {appointment.date.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                    {appointment.notes && (
                      <div className="flex items-start gap-2 text-gray-700 sm:col-span-2">
                        <FileText className="w-4 h-4 text-gray-500 mt-0.5" />
                        <span className="text-sm">{appointment.notes}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Past Appointments */}
      {past.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-black mb-4">Past Appointments</h2>
          <div className="space-y-4">
            {past.map((appointment) => (
              <Card key={appointment.id} className="border-gray-200 bg-gray-50">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <CardTitle className="text-lg text-gray-700">{appointment.procedure}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <User className="w-4 h-4" />
                        Dr. {appointment.doctorName}
                      </CardDescription>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`w-fit ${
                        appointment.status === 'CANCELLED' 
                          ? 'border-red-500 text-red-600' 
                          : 'border-gray-500 text-gray-600'
                      }`}
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {appointment.date.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                    <span className="mx-1">•</span>
                    <Clock className="w-4 h-4" />
                    {appointment.date.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Contact Reminder */}
      {appointments.length > 0 && (
        <Card className="border-gray-200 mt-8 bg-gray-50">
          <CardContent className="py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-black">Need to reschedule?</h3>
                <p className="text-gray-600 text-sm">Please call us to modify your appointment</p>
              </div>
              <Button asChild className="bg-black text-white hover:bg-gray-800">
                <a href="tel:+85212345678">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Clinic
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
