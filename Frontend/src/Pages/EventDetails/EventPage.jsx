import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, CalendarDays, Clock, MapPin, Users, AlertCircle } from 'lucide-react';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Mock student user
  const [currentUser] = useState({
    id: 'student123',
    role: 'Student',
    firstName: 'Alex',
    lastName: 'Johnson'
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        // Mock data
        const mockEvents = [
          {
            _id: '1',
            title: 'Math Olympiad Championship',
            description: 'Annual inter-school math competition for grades 9-12 with cash prizes for top performers.',
            eventType: 'Academic',
            date: '2025-06-15T00:00:00Z',
            startTime: '09:00',
            endTime: '12:00',
            location: 'Main Auditorium, Building A',
            eligibleRoles: ['Student'],
            maxParticipants: 30,
            currentParticipants: 18,
            registrationDeadline: '2025-06-10T00:00:00Z',
            participants: [
              { userId: 'student123', status: 'Registered' }
            ]
          },
          {
            _id: '2',
            title: 'Basketball Tournament Finals',
            description: 'Championship games for the intramural basketball league. Spectators welcome!',
            eventType: 'Sports',
            date: '2025-06-20T00:00:00Z',
            startTime: '15:00',
            endTime: '18:00',
            location: 'School Gymnasium',
            eligibleRoles: ['Student'],
            maxParticipants: 40,
            currentParticipants: 32,
            registrationDeadline: '2025-06-15T00:00:00Z',
            participants: []
          },
          {
            _id: '3',
            title: 'Science Fair Exhibition',
            description: 'Showcase of student science projects with judging panel from local universities.',
            eventType: 'Academic',
            date: '2025-06-25T00:00:00Z',
            startTime: '10:00',
            endTime: '14:00',
            location: 'Science Wing, Building C',
            eligibleRoles: ['Student', 'Teacher'],
            maxParticipants: 60,
            currentParticipants: 42,
            registrationDeadline: '2025-06-20T00:00:00Z',
            participants: []
          }
        ];
        setEvents(mockEvents);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to load events",
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [toast]);

  const handleApplication = async (eventId, action) => {
    try {
      // Mock implementation
      setEvents(prevEvents => 
        prevEvents.map(event => {
          if (event._id === eventId) {
            if (action === 'apply') {
              return {
                ...event,
                participants: [...event.participants, { userId: currentUser.id, status: 'Registered' }],
                currentParticipants: event.currentParticipants + 1
              };
            } else {
              return {
                ...event,
                participants: event.participants.filter(p => p.userId !== currentUser.id),
                currentParticipants: event.currentParticipants - 1
              };
            }
          }
          return event;
        })
      );

      toast({
        title: action === 'apply' ? 'Application Successful' : 'Cancellation Successful',
        description: action === 'apply' 
          ? 'You have successfully registered for this event.' 
          : 'Your registration has been cancelled.',
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: action === 'apply' ? 'Application Failed' : 'Cancellation Failed',
        description: error.message,
      });
    }
  };

  const isRegistered = (event) => {
    return event.participants.some(p => p.userId === currentUser.id);
  };

  const isPastDeadline = (event) => {
    return new Date() > new Date(event.registrationDeadline);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventStatus = (event) => {
    if (isPastDeadline(event)) return 'closed';
    if (event.currentParticipants >= event.maxParticipants) return 'full';
    if (isRegistered(event)) return 'registered';
    if (!event.eligibleRoles.includes(currentUser.role)) return 'ineligible';
    return 'open';
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#374258] mb-3">School Events</h1>
          <p className="text-lg text-[#6a7285] max-w-2xl mx-auto">
            Discover and register for upcoming academic, sports, and cultural events
          </p>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="border border-[#c4c4c4] rounded-xl overflow-hidden shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-7 w-3/4 rounded-lg" />
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-5/6 rounded" />
                  <div className="space-y-3 pt-2">
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-full rounded" />
                  </div>
                  <Skeleton className="h-10 w-full rounded-lg mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : events.length === 0 ? (
          <Alert className="max-w-2xl mx-auto bg-white border border-[#c4c4c4]">
            <Info className="h-5 w-5 text-[#374258]" />
            <AlertTitle className="text-[#374258]">No events scheduled</AlertTitle>
            <AlertDescription className="text-[#6a7285]">
              Check back later for upcoming events or contact the administration to organize one.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(event => {
              const status = getEventStatus(event);
              const progressPercentage = Math.min(
                (event.currentParticipants / event.maxParticipants) * 100,
                100
              );

              return (
                <Card 
                  key={event._id} 
                  className="border border-[#c4c4c4] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 bg-white"
                >
                  <CardHeader className="p-0">
                    <div className={`h-2 w-full ${status === 'open' ? 'bg-[#f74464]' : status === 'registered' ? 'bg-green-500' : 'bg-[#6a7285]'}`} />
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-bold text-[#374258] leading-tight">{event.title}</h2>
                      <Badge 
                        variant="outline" 
                        className={`border ${event.eventType === 'Academic' ? 'border-blue-200 bg-blue-50 text-blue-600' : 
                                    event.eventType === 'Sports' ? 'border-green-200 bg-green-50 text-green-600' : 
                                    'border-purple-200 bg-purple-50 text-purple-600'}`}
                      >
                        {event.eventType}
                      </Badge>
                    </div>
                    
                    <p className="text-[#6a7285] mb-5 leading-relaxed">{event.description}</p>
                    
                    <div className="space-y-3 mb-5">
                      <div className="flex items-start gap-3">
                        <CalendarDays className="h-4 w-4 mt-0.5 text-[#374258] flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-[#374258]">{formatDate(event.date)}</p>
                          <p className="text-sm text-[#6a7285] flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTime(event.startTime)} - {formatTime(event.endTime)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <MapPin className="h-4 w-4 mt-0.5 text-[#374258] flex-shrink-0" />
                        <p className="text-sm text-[#6a7285]">{event.location}</p>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Users className="h-4 w-4 mt-0.5 text-[#374258] flex-shrink-0" />
                        <div className="w-full">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-[#374258] font-medium">
                              {event.currentParticipants}/{event.maxParticipants} registered
                            </span>
                            <span className="text-[#6a7285]">
                              {Math.round(progressPercentage)}% full
                            </span>
                          </div>
                          <div className="w-full bg-[#f3f3f3] rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${progressPercentage >= 90 ? 'bg-red-400' : progressPercentage >= 75 ? 'bg-orange-400' : 'bg-[#f74464]'}`}
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-6 pt-0">
                    {status === 'closed' ? (
                      <Button variant="outline" className="w-full" disabled>
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Registration Closed
                      </Button>
                    ) : status === 'full' ? (
                      <Button variant="outline" className="w-full" disabled>
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Event Full
                      </Button>
                    ) : status === 'registered' ? (
                      <div className="w-full space-y-3">
                        <Badge className="w-full justify-center bg-green-100 text-green-800 py-1.5">
                          ✓ You're Registered
                        </Badge>
                        <Button
                          variant="outline"
                          className="w-full text-[#f74464] border-[#f74464] hover:bg-[#f74464]/10"
                          onClick={() => handleApplication(event._id, 'cancel')}
                        >
                          Cancel Registration
                        </Button>
                      </div>
                    ) : status === 'ineligible' ? (
                      <Button variant="outline" className="w-full" disabled>
                        Not Eligible for Your Role
                      </Button>
                    ) : (
                      <Button
                        className="w-full bg-[#f74464] hover:bg-[#e13a57] shadow-sm"
                        onClick={() => handleApplication(event._id, 'apply')}
                      >
                        Register Now
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPage;