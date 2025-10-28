import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";

const Apply = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessLink: "",
    role: "",
    challenge: "",
    currentAI: "",
    goals: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    if (Object.values(formData).some(value => !value)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send to a backend
    console.log("Application submitted:", formData);
    
    setSubmitted(true);
    toast({
      title: "Application Submitted!",
      description: "We'll review your application and get back to you within 48 hours.",
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-4 flex items-center justify-center">
        <Card className="max-w-2xl w-full text-center">
          <CardContent className="pt-12 pb-12 space-y-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Application Received!</h2>
            <p className="text-lg text-muted-foreground">
              Thanks for applying to Agents and Founders. We'll review your application 
              and reach out within 48 hours if you're a good fit for the community.
            </p>
            <p className="text-muted-foreground">
              We sent a confirmation to <strong>{formData.email}</strong>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="px-4 mb-12">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Apply to <span className="text-primary">Join</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            We keep our community small and focused. Tell us about yourself and what you're building.
          </p>
        </div>
      </section>

      {/* Application Form */}
      <section className="px-4">
        <div className="container mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Your Application</CardTitle>
              <CardDescription>
                All fields are required. We review every application personally.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input 
                    id="name" 
                    placeholder="Jane Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessLink">Link to Your Business *</Label>
                  <Input 
                    id="businessLink" 
                    type="url"
                    placeholder="https://yourcompany.com"
                    value={formData.businessLink}
                    onChange={(e) => setFormData({...formData, businessLink: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">What's your role? *</Label>
                  <Select onValueChange={(value) => setFormData({...formData, role: value})} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="founder">Founder / Co-Founder</SelectItem>
                      <SelectItem value="ceo">CEO</SelectItem>
                      <SelectItem value="cto">CTO</SelectItem>
                      <SelectItem value="solopreneur">Solopreneur</SelectItem>
                      <SelectItem value="agency-owner">Agency Owner</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="challenge">What's your biggest business challenge right now? *</Label>
                  <Textarea 
                    id="challenge"
                    placeholder="Tell us about the main obstacle you're facing..."
                    className="min-h-[100px]"
                    value={formData.challenge}
                    onChange={(e) => setFormData({...formData, challenge: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentAI">How are you currently using AI in your business? *</Label>
                  <Textarea 
                    id="currentAI"
                    placeholder="Describe your current AI tools and workflows..."
                    className="min-h-[100px]"
                    value={formData.currentAI}
                    onChange={(e) => setFormData({...formData, currentAI: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals">What do you hope to gain from this community? *</Label>
                  <Textarea 
                    id="goals"
                    placeholder="Be specific about what you're looking for..."
                    className="min-h-[100px]"
                    value={formData.goals}
                    onChange={(e) => setFormData({...formData, goals: e.target.value})}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 h-12"
                >
                  Submit Application
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  By submitting, you agree to our community guidelines. We typically respond within 48 hours.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Apply;
