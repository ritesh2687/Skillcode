import React from "react";
import { Card, CardContent } from "@/components/ui/Card";

// import image from '../images/photo.jpg';
// import {CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";


const Course = () => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEX-g2yFcutyh_0Ww2GNvJ5PvQvAzY1OEEQg&s"
          alt="course"
          className="w-full h-36 object-cover rounded-t-lg"
        />
      </div>

      <CardContent className="px-5 py-4 space-y-3">
        <h1 className="hover:underline font-bold text-lg truncate">
          Nextjs complete Course in Hindi 2025{" "}
        </h1>
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="font-medium text-sm">SkillB00st</h1>
        </div>
        <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
        Advance
        </Badge>
        </div>
        <div className="text-lg font-bold">
          <span >
          ₹4999 
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;
