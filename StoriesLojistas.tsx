import React from "react";

const mockStories = [
  { id: 1, name: "Padaria Vale", image: "https://i.pravatar.cc/150?img=11" },
  { id: 2, name: "Burger FG", image: "https://i.pravatar.cc/150?img=12" },
  { id: 3, name: "Pet Club", image: "https://i.pravatar.cc/150?img=13" },
  { id: 4, name: "Studio Fit", image: "https://i.pravatar.cc/150?img=14" },
  { id: 5, name: "Dona Ana", image: "https://i.pravatar.cc/150?img=15" },
  { id: 6, name: "Barbearia ZN", image: "https://i.pravatar.cc/150?img=16" },
];

const StoriesLojistas = () => {
  return (
    <div className="px-5 mt-1 mb-3">
      <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
        {mockStories.map((story) => (
          <div key={story.id} className="flex flex-col items-center cursor-pointer group">
            <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 to-orange-600">
              <div className="w-full h-full rounded-full p-[2px] bg-white dark:bg-gray-900">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full rounded-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
            </div>
            <p className="text-xs mt-1 text-gray-700 dark:text-gray-300 truncate w-16 text-center font-medium">
              {story.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesLojistas;