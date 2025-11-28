import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 text-blue-600 bg-white/90 px-4 py-2">
            <MessageSquare className="h-4 w-4 mr-2" />
            GET IN TOUCH
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Our Team</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question, feedback, or need assistance, our team is ready to help.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Quick Contact Cards */}
          <Card className="hover:shadow-lg transition-all border-l-4 border-l-blue-600">
            <CardContent className="p-6">
              <Mail className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-sm text-gray-600 mb-4">For general inquiries and support.</p>
              <a href="mailto:support@altroway.com" className="text-blue-600 font-medium hover:underline">
                support@altroway.com
              </a>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all border-l-4 border-l-green-600">
            <CardContent className="p-6">
              <Clock className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-sm text-gray-600 mb-4">Mon-Fri from 9am to 5pm CET.</p>
              <a href="tel:+491234567890" className="text-green-600 font-medium hover:underline">
                +49 123 456 7890
              </a>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all border-l-4 border-l-purple-600">
            <CardContent className="p-6">
              <MapPin className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Office</h3>
              <p className="text-sm text-gray-600 mb-4">Come visit us at our headquarters.</p>
              <p className="text-purple-600 font-medium">Berlin, Germany</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <Card className="shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
              <div className="flex items-center gap-2">
                <Send className="w-6 h-6 text-blue-600" />
                <div>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-semibold text-gray-900">Full Name</Label>
                    <Input id="name" placeholder="John Doe" className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-semibold text-gray-900">Email Address</Label>
                    <Input id="email" type="email" placeholder="m@example.com" className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="font-semibold text-gray-900">Subject</Label>
                  <Input id="subject" placeholder="e.g., Question about visa applications" className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="font-semibold text-gray-900">Message</Label>
                  <Textarea id="message" placeholder="Your message..." className="min-h-[140px] border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Response Time & FAQ */}
          <div className="space-y-6">
            <Card className="shadow-lg bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-900">Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-green-900">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">📧</span>
                    <div>
                      <p className="font-semibold">Email Support</p>
                      <p className="text-sm">Response within 24 hours</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">☎️</span>
                    <div>
                      <p className="font-semibold">Phone Support</p>
                      <p className="text-sm">Available Mon-Fri 9am-5pm CET</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">💬</span>
                    <div>
                      <p className="font-semibold">Live Chat</p>
                      <p className="text-sm">Real-time support for urgent matters</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-900">Frequently Asked Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-orange-900">
                  <li className="flex items-center gap-2">
                    <span className="text-orange-600">►</span> Visa & Immigration Help
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-600">►</span> Job Application Support
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-600">►</span> Account & Profile Issues
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-600">►</span> Payment & Billing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-600">►</span> Technical Assistance
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
