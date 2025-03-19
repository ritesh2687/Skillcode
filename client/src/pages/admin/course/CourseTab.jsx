import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEditCourseMutation, useGetCourseByIdQuery } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
    const [input, setInput] = useState({
        courseTitle: "",
        subTitle: "",
        description: "",
        category: "",
        courseLevel: "",
        coursePrice: "",
        courseThumbnail: "",
    });
    const params = useParams();
    const courseId = params.courseId;
    const { data: courseByIdData, isLoading: courseByIdLoading } = useGetCourseByIdQuery(courseId,{refetchOnMountOrArgChange:true});
    
    useEffect(() => {
        if (courseByIdData?.course) {
            const course = courseByIdData?.course;
            setInput({
                courseTitle: course.courseTitle,
                subTitle: course.subTitle,
                description: course.description,
                category: course.category,
                courseLevel: course.courseLevel,
                coursePrice: course.coursePrice,
                courseThumbnail: "",
            });
        }
    }, [courseByIdData?.course]);

    const [previewThumbnail, setPreviewThumbnail] = useState("");
    const navigate = useNavigate();
    


    const [editCourse, { data, isLoading, isSuccess, error }] = useEditCourseMutation();


    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const selectCategory = (value) => {
        setInput({ ...input, category: value });
    }
    const selectCourseLevel = (value) => {
        setInput({ ...input, courseLevel: value });
    }

    //get file
    const selectThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, courseThumbnail: file });
            const fileReader = new FileReader();
            fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
            fileReader.readAsDataURL(file);
        }
    };

    const updateCourseHandler = async () => {
        const formData = new FormData();
        formData.append("courseTitle", input.courseTitle);
        formData.append("subTitle", input.subTitle);
        formData.append("description", input.description);
        formData.append("category", input.category);
        formData.append("courseLevel", input.courseLevel);
        formData.append("coursePrice", input.coursePrice);
        formData.append("courseThumbnail", input.courseThumbnail);


        await editCourse({ formData, courseId });
        // console.log(input);
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "Course updated")
        }
        if (error) {
            toast.error(error.data.message || "failed to update");
        }
    }, [isSuccess, error]);

    if(courseByIdLoading) return<Loader2 className="h-4 w-4 animate-spin"/>

    const isPublished = false;

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between">
                <div>
                    <CardTitle>Basic course information</CardTitle>
                    <CardDescription>
                        Make changes to your courses.Click save when you're done
                    </CardDescription>
                </div>
                <div className="space-x-2">
                    <Button variant="outline">
                        {isPublished ? "Unpublished" : "Published"}
                    </Button>
                    <Button>Remove Course</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 mt-5">
                    <div>
                        <Label>Title</Label>
                        <Input
                            type="text"
                            name="courseTitle"
                            value={input.courseTitle}
                            onChange={changeEventHandler}
                            placeholder="Ex. Fullstack development"
                        ></Input>
                    </div>

                    <div>
                        <Label>SubTitle</Label>
                        <Input
                            type="text"
                            name="subTitle"
                            value={input.subTitle}
                            onChange={changeEventHandler}
                            placeholder="Ex. Become a  Fullstack developer from zero to hero"
                        ></Input>
                    </div>
                    <div>
                        <Label>Description</Label>

                        <RichTextEditor input={input} setInput={setInput} />

                    </div>


                    <div className="flex items-center gap-5">
                        <div>
                            <Label>Category</Label>
                            <Select onValueChange={selectCategory}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        <SelectItem value="Next JS">Next JS</SelectItem>
                                        <SelectItem value="Data Science">Data Science</SelectItem>
                                        <SelectItem value="Frontend Development">
                                            Frontend Development
                                        </SelectItem>
                                        <SelectItem value="Fullstack Development">
                                            Fullstack Development
                                        </SelectItem>
                                        <SelectItem value="MERN Stack Development">
                                            MERN Stack Development
                                        </SelectItem>
                                        <SelectItem value="Javascript">Javascript</SelectItem>
                                        <SelectItem value="Python">Python</SelectItem>
                                        <SelectItem value="Docker">Docker</SelectItem>
                                        <SelectItem value="MongoDB">MongoDB</SelectItem>
                                        <SelectItem value="HTML">HTML</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Course Level</Label>
                            <Select onValueChange={selectCourseLevel}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a course level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Course Level</SelectLabel>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Advanced">Advanced</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>
                                Price in (INR)
                            </Label>
                            <Input type="Number" name="coursePrice" value={input.coursePrice} onChange={changeEventHandler}
                                placeholder=" ₹..." className="w-fit" />
                        </div>

                    </div>
                    <div>
                        <Label>CourseThumbnail</Label>
                        <Input
                            type="file"
                            onChange={selectThumbnail}
                            accept="image/"
                            className="w-fit"
                        />
                        {
                            previewThumbnail && (
                                <img src={previewThumbnail} className="e-64 my-2" alt="course Thumbnail" />
                            )
                        }
                    </div>
                    <div>
                        <Button variant="outline" onClick={() => navigate("/admin/course")}>Cancle</Button>
                        <Button disabled={isLoading} onClick={updateCourseHandler}>
                            {
                                isLoading ? (<>
                                    <Loader2 className="mr-2 h-4 animate-spin" />
                                    please wait</>
                                ) : "Save"
                            }
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CourseTab;
