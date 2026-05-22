import { useParams, Navigate } from "react-router-dom";
import LessonShell from "../components/LessonShell";
import lesson1 from "../lessons/lesson1";
import lesson2 from "../lessons/lesson2";
import lesson3 from "../lessons/lesson3";
import lesson4 from "../lessons/lesson4";
import lesson5 from "../lessons/lesson5";
import lesson6 from "../lessons/lesson6";
import lesson7 from "../lessons/lesson7";
import lesson8 from "../lessons/lesson8";

const lessons = {
  "baby-born-100": lesson1,
  "twenty-oclock": lesson2,
  "video-rental": lesson3,
  "nineteen-hundred": lesson4,
  "leap-day": lesson5,
  "slot-machines": lesson6,
  "transactions-1899": lesson7,
  "broken-fix": lesson8,
};

export default function Lesson() {
  const { slug } = useParams();
  const lesson = lessons[slug];

  if (!lesson) {
    return <Navigate to="/" replace />;
  }

  return <LessonShell key={slug} lesson={lesson} />;
}
