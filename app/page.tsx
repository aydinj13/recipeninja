"use client"

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SkeletonCard from "@/components/SkeletonCard";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";


interface Recipe {
  title: string;
  image: string;
  time: number;
  description: string;
  vegan: boolean;
  id: string;
  url: string;
}

async function getRecipes(): Promise<Recipe[]> {
  const result = await fetch("http://localhost:4000/recipes");

  // Simulate loading delay
  await new Promise((resolve) => setTimeout(resolve, 1));

  return result.json();
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipesData = await getRecipes();
        setRecipes(recipesData);
      } catch (error) {
        // Handle error if needed
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs once when the component mounts

  return (
    <main>
      <div className="grid grid-cols-3 gap-8">
        {loading ? (
          // Render skeleton while loading
          ["a", "b", "c"].map((id) => <SkeletonCard key={id} />)
        ) : (
          // Render actual content when not loading
          recipes.map(recipe => (
            <Card key={recipe.id} className="flex flex-col justify-between">
              <CardHeader className="flex-row gap-4 items-center">
                <Avatar>
                  <AvatarImage src={`/img/${recipe.image}`} />
                  <AvatarFallback>
                    {recipe.title.slice(0,2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{recipe.title}</CardTitle>
                  <CardDescription>{recipe.time} mins to cook</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p>{recipe.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
              <Button onClick={() => {
                window.open(`https://www.foodnetwork.com/recipes/${recipe.url}`)
              }}>View Recipe</Button>
                {recipe.vegan && <Badge variant="secondary">Vegan</Badge>}
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}