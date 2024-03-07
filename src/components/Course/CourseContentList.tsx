import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";
import { CourseLecture } from "../../models/course.model";
import "react-accessible-accordion/dist/fancy-example.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Props {
  courseData: CourseLecture[];
  setDrawerOpen?: any;
  isDemo?: boolean;
  isDrawerOpen?: boolean;
}

const CourseContentList = ({ courseData, isDemo, setDrawerOpen, isDrawerOpen }: Props) => {
  // Find Unique sections using Set
  const videoSections = [...new Set(courseData.map((video) => video.videoSection))];
  const [active, setActive] = useState(courseData[0]._id);

  return (
    <Accordion allowZeroExpanded>
      {videoSections?.map((videoSection, index) => {
        // filter videos by section
        const sectionVideos = courseData.filter((video) => video.videoSection === videoSection);
        const sectionVideoCount = sectionVideos.length;
        const sectionVideoLength = sectionVideos.reduce((acc, video) => acc + video.videoLength, 0);

        const sectionContentHours = Math.floor(sectionVideoLength / 60);

        return (
          <AccordionItem key={index} className={`mb-4 p-3 px-5 ${!isDemo && "cursor-pointer"}`}>
            <AccordionItemHeading>
              <AccordionItemButton className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl">{videoSection}</h1>
                  <p className="text-lg">{`${sectionVideoCount} Lessons | ${sectionContentHours}h ${sectionVideoLength % 60}m`}</p>
                </div>
                <i className="fa-solid fa-chevron-down"></i>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              {sectionVideos.map((video, index) => (
                <div key={index} className="mb-4">
                  {isDemo ? (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <i className="fa-solid fa-film fa-xl me-4"></i>
                        <div>
                          <p className="text-lg font-semibold">{video.title}</p>
                          <p className="text-lg">{video.description}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-lg">{`${video.videoLength} min`}</p>
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      to={`${video._id}`}
                      onClick={() => {
                        setActive(video._id);
                        setDrawerOpen(!isDrawerOpen);
                      }}
                    >
                      <div className={`shadow-lg border border-base-100 p-2 ${active === video._id && "bg-base-100"}`}>
                        <div className="flex items-center">
                          <i className="fa-solid fa-film fa-xl me-4"></i>
                          <div>
                            <p className="text-lg font-semibold">{video.title}</p>
                          </div>
                        </div>
                        <p className="text-lg mt-2 ms-2">{`${video.videoLength} min`}</p>
                      </div>
                    </NavLink>
                  )}
                </div>
              ))}
            </AccordionItemPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default CourseContentList;
