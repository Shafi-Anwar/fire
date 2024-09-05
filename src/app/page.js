"use client";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import HabitList from "../components/HabitList";
import UserAvatar from "../components/UserAvatar";

const Home = () => {
  const { data: session } = useSession();
  const [habits, setHabits] = useState([
    { text: "Exercise for 30 minutes", icon: "dumbbell" },
    { text: "Read for 20 minutes", icon: "book" },
    { text: "Drink 2 liters of water", icon: "tint" },
    { text: "Meditate for 10 minutes", icon: "medkit" },
  ]);

  const addHabit = (habit) => {
    setHabits([...habits, habit]);
  };

  const editHabit = (index, updatedHabit) => {
    const updatedHabits = habits.map((habit, i) =>
      i === index ? updatedHabit : habit
    );
    setHabits(updatedHabits);
  };

  const removeHabit = (index) => {
    const updatedHabits = habits.filter((_, i) => i !== index);
    setHabits(updatedHabits);
  };

  return (
    <div>
      <header className="bg-gray-200 p-4">
        {session ? (
          <UserAvatar user={session.user} />
        ) : (
          <div className="text-center">
            <p>Please sign in to see your profile.</p>
            <button
              onClick={() => signIn()}
              className="mt-2 text-blue-500 hover:underline"
            >
              Sign In
            </button>
          </div>
        )}
      </header>

      <main className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-4xl font-bold text-center mb-8">Habit Tracker</h1>
        <HabitList
          habits={habits}
          onAdd={addHabit}
          onEdit={editHabit}
          onRemove={removeHabit}
        />
      </main>

      <footer className="text-center py-4 bg-gray-200">
        <p>Powered by Next.js and Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default Home;
