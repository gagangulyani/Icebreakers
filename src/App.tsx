{" "}
    
    import { useState } from 'react';
    import { MessageSquareQuote, SlidersHorizontal } from 'lucide-react';
    import { IcebreakerCard } from '@/components/IcebreakerCard';
    import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
    } from '@/components/ui/select';
    import { Button } from '@/components/ui/button';
    import icebreakerData from '@/data/icebreakers.json';
    import { ThemeToggle } from './components/theme-toggle';
    import {
      Carousel,
      CarouselContent,
      CarouselItem,
      CarouselNext,
      CarouselPrevious,
    } from "@/components/ui/carousel";
    import {
      Collapsible,
      CollapsibleContent,
      CollapsibleTrigger,
    } from "@/components/ui/collapsible"
    
    interface Question {
      id: number;
      question: string;
      description: string;
      field: string;
    }
    
    function App() {
      const [field, setField] = useState<string>('all');
      const [isFilterOpen, setIsFilterOpen] = useState(false);
      const [filteredQuestions, setFilteredQuestions] = useState<Question[]>(icebreakerData.questions);
    
      const fields = ['all', ...icebreakerData.fields];
    
      const handleFilter = () => {
        let questions = icebreakerData.questions;
    
        if (field !== 'all') {
          questions = questions.filter((q) => q.field === field);
        }
    
        setFilteredQuestions(questions);
        setIsFilterOpen(false); // Close filters after applying
      };
      
      const handleReset = () => {
        setField('all');
        setFilteredQuestions(icebreakerData.questions);
        setIsFilterOpen(false); // Close filters after resetting
      };
    
      return (
        <div className="min-h-screen w-full bg-background text-foreground">
          <header className="container mx-auto px-4 pt-8 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center justify-center bg-primary text-primary-foreground p-2 rounded-lg">
                <MessageSquareQuote className="h-6 w-6" />
              </div>
               <h1 className="text-xl font-bold tracking-tight hidden sm:block">
                Developer Icebreakers
              </h1>
            </div>
            <ThemeToggle />
          </header>
          <main className="container mx-auto px-4 py-8 md:py-12">
            <section className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Developer Icebreakers
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Funny, nerdy, and sometimes weird questions to break the ice with your fellow developers.
              </p>
            </section>
    
            <div className="mb-12 hidden sm:block">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label htmlFor="field-select" className="block text-sm font-medium mb-2 text-muted-foreground">
                    Category
                  </label>
                  <Select value={field} onValueChange={setField}>
                    <SelectTrigger id="field-select" className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {fields.map((f) => (
                        <SelectItem key={f} value={f}>
                          {f === 'all' ? 'All Categories' : f}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="lg:col-span-3 flex flex-col sm:flex-row gap-2 w-full pt-4 sm:pt-0">
                  <Button onClick={handleFilter} className="w-full">Find Questions</Button>
                  <Button onClick={handleReset} variant="outline" className="w-full">Reset Filters</Button>
                </div>
              </div>
            </div>
    
            <Collapsible
              open={isFilterOpen}
              onOpenChange={setIsFilterOpen}
              className="mb-12 sm:hidden"
            >
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 p-4 sm:p-6 bg-card/50 backdrop-blur-sm rounded-lg border">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                  <div>
                    <label htmlFor="field-select" className="block text-sm font-medium mb-2 text-muted-foreground">
                      Category
                    </label>
                    <Select value={field} onValueChange={setField}>
                      <SelectTrigger id="field-select" className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {fields.map((f) => (
                          <SelectItem key={f} value={f}>
                            {f === 'all' ? 'All Categories' : f}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="lg:col-span-3 flex flex-col sm:flex-row gap-2 w-full pt-4 sm:pt-0">
                    <Button onClick={handleFilter} className="w-full">Find Questions</Button>
                    <Button onClick={handleReset} variant="outline" className="w-full">Reset Filters</Button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
    
            {filteredQuestions.length > 0 ? (
              <div className="relative w-full max-w-5xl mx-auto flex justify-center items-center">
                <Carousel
                  opts={{
                    align: "center",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {filteredQuestions.map((q) => (
                      <CarouselItem key={q.id} className="sm:basis-1/2 lg:basis-1/3">
                        <div className="p-1 h-full">
                          <IcebreakerCard
                            question={q.question}
                            description={q.description}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="hidden md:block">
                    <CarouselPrevious />
                    <CarouselNext />
                  </div>
                </Carousel>
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No questions found. Try changing your filters!</p>
              </div>
            )}
    
            <footer className="text-center mt-16 text-muted-foreground">
              <p>Built with <span role="img" aria-label="love">❤️</span> and a bit of code.</p>
            </footer>
          </main>
        </div>
      );
    }
    
    export default App;
