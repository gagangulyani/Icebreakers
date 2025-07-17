import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    
    interface IcebreakerCardProps {
      question: string;
      description: string;
    }
    
    export function IcebreakerCard({ question, description }: IcebreakerCardProps) {
      return (
        <Card className="flex flex-col justify-between h-full bg-card/80 backdrop-blur-sm border transition-all duration-300 transform hover:-translate-y-1 hover:border-primary">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground">{question}</CardTitle>
            <CardDescription className="text-muted-foreground pt-2">{description}</CardDescription>
          </CardHeader>
        </Card>
      );
    }
