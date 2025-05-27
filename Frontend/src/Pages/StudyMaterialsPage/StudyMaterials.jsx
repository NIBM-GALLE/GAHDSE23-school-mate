import React, { useState } from "react";

const StudyMaterials = () => {
  const allMaterials = [
    
    {
      title: "Biology: Cell Structure & Function",
      moduleId: "BIO101",
      description: "Detailed notes on cellular biology with diagrams",
      fileUrl: "https://www.khanacademy.org/science/biology/structure-of-a-cell",
      status: "Completed",
    },
    {
      title: "Political Science Fundamentals",
      moduleId: "POL101",
      description: "Government types, political ideologies, and systems",
      fileUrl: "https://www.britannica.com/topic/political-science",
      status: "Not Started",

    },
    {
      title: "Physics: Mechanics and Motion",
      moduleId: "PHY101",
      description: "Newton’s laws, motion, forces, and energy concepts",
      fileUrl: "https://www.physicsclassroom.com/class/1DKin",
      status: "In Progress",
    },
    {
      title: "Political Science Fundamentals",
      moduleId: "POL101",
      description: "Government types, political ideologies, and systems",
      fileUrl: "https://www.britannica.com/topic/political-science",
      status: "Not Started",
    },
    {
      title: "Business Studies Overview",
      moduleId: "BUS101",
      description: "Introduction to business environments and management",
      fileUrl: "https://www.tutor2u.net/business/reference/what-is-business",
      status: "Completed",
    },
    {
      title: "Intro to Machine Learning",
      moduleId: "ML101",
      description: "Basic concepts and terminology",
      fileUrl: "https://example.com/ml-intro-slides.pptx",
      status: "Completed",
    },
    {
      title: "ICT Essentials",
      moduleId: "ICT101",
      description: "Core ICT concepts including hardware, software, and networks",
      fileUrl: "https://www.bbc.co.uk/bitesize/subjects/zqmtsbk",
      status: "In Progress",
    },
    {
      title: "Financial Accounting Principles",
      moduleId: "COM201",
      description: "Core accounting concepts, journal entries, and ledgers",
      fileUrl: "https://www.accountingcoach.com/financial-accounting/explanation",
      status: "In Progress",
    },
    {
      title: "Entrepreneurship and Innovation",
      moduleId: "COM305",
      description: "Basics of starting a business, innovation strategies, and case studies",
      fileUrl: "https://www.coursera.org/learn/wharton-entrepreneurship",
      status: "Not Started",
    },
    {
  title: "Critical Thinking and Problem Solving",
  moduleId: "GEN101",
  description: "Improve reasoning skills through real-life problem-solving techniques",
  fileUrl: "https://www.edx.org/course/critical-thinking-problem-solving",
  status: "Completed",
},
{
  title: "Time Management for Students",
  moduleId: "GEN102",
  description: "Strategies to manage time effectively for academic success",
  fileUrl: "https://www.mindtools.com/pages/main/newMN_HTE.htm",
  status: "In Progress",
},
{
  title: "Effective Communication Skills",
  moduleId: "GEN103",
  description: "Learn how to communicate clearly and confidently in any setting",
  fileUrl: "https://www.coursera.org/learn/wharton-communication-skills",
  status: "Completed",
},
{
  title: "Digital Literacy Basics",
  moduleId: "ICT001",
  description: "Essential skills for using digital tools and the internet safely",
  fileUrl: "https://edu.gcfglobal.org/en/digital-literacy/",
  status: "Not Started",
},
{
  title: "Ethical Hacking Overview",
  moduleId: "CYB301",
  description: "Learn ethical hacking fundamentals and cybersecurity awareness",
  fileUrl: "https://www.cybrary.it/course/ethical-hacking/",
  status: "In Review",
},
{
  title: "Emotional Intelligence for Students",
  moduleId: "GEN104",
  description: "Understand and manage emotions for personal and academic growth",
  fileUrl: "https://www.futurelearn.com/courses/emotional-intelligence-at-work",
  status: "In Progress",
},
{
  title: "Financial Literacy for Beginners",
  moduleId: "FIN100",
  description: "Basic personal finance concepts like budgeting, saving, and investing",
  fileUrl: "https://www.investopedia.com/financial-literacy-5188651",
  status: "Completed",
},
{
  title: "Public Speaking and Presentation",
  moduleId: "COM201",
  description: "Learn techniques to deliver impactful speeches and presentations",
  fileUrl: "https://www.toastmasters.org/resources/public-speaking-tips",
  status: "In Progress",
},
{
  title: "Environmental Awareness and Sustainability",
  moduleId: "ENV101",
  description: "Explore topics like climate change, waste management, and green tech",
  fileUrl: "https://www.un.org/sustainabledevelopment/sustainable-consumption-production/",
  status: "Not Started",
},
{
  title: "Basics of Entrepreneurship",
  moduleId: "ENT100",
  description: "An introduction to starting and managing a small business or startup",
  fileUrl: "https://www.khanacademy.org/economics-finance-domain/entrepreneurship",
  status: "Completed",
},
{
  title: "Career Planning Guide",
  moduleId: "GEN105",
  description: "Steps to explore, plan, and achieve career goals effectively",
  fileUrl: "https://bigfuture.collegeboard.org/plan-for-college/careers-career-search",
  status: "In Review",
},
{
  title: "Critical Thinking and Problem Solving",
  moduleId: "GEN110",
  description: "Techniques to analyze situations, identify solutions, and make logical decisions",
  fileUrl: "https://www.skillsyouneed.com/learn/critical-thinking.html",
  status: "Completed",
}


  ];

  const [moduleFilter, setModuleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const uniqueModules = [...new Set(allMaterials.map((m) => m.moduleId))];
  const uniqueStatuses = [...new Set(allMaterials.map((m) => m.status))];

  const filteredMaterials = allMaterials.filter((material) => {
    return (
      (moduleFilter === "All" || material.moduleId === moduleFilter) &&
      (statusFilter === "All" || material.status === statusFilter)
    );
  });

  const renderFilePreview = (fileUrl) => {
    const ext = fileUrl.split(".").pop().toLowerCase();
    if (ext === "pdf") {
      return (
        <embed
          src={fileUrl}
          type="application/pdf"
          className="w-full h-36 object-contain"
        />
      );
    } else if (ext === "ppt" || ext === "pptx") {
      return (
        <img
          src="https://img.icons8.com/color/96/microsoft-powerpoint-2019--v1.png"
          alt="PPT Icon"
          className="h-14 mx-auto"
        />
      );
    } else if (ext === "doc" || ext === "docx") {
      return (
        <img
          src="https://img.icons8.com/color/96/microsoft-word-2019--v1.png"
          alt="DOC Icon"
          className="h-14 mx-auto"
        />
      );
    } else {
      return (
        <img
          src="https://img.icons8.com/color/96/file--v1.png"
          alt="File Icon"
          className="h-14 mx-auto"
        />
      );
    }
  };

  return (
    <div className="px-6 py-10 bg-[#f3f3f3] min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-[#374258] mb-8">Study Materials</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <div>
          <label className="block text-sm text-[#374258] mb-1">Filter by Module</label>
          <select
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            className="border border-[#ccc] rounded-md px-3 py-2 text-sm"
          >
            <option value="All">All Modules</option>
            {uniqueModules.map((module, index) => (
              <option key={index} value={module}>
                {module}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-[#374258] mb-1">Filter by Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-[#ccc] rounded-md px-3 py-2 text-sm"
          >
            <option value="All">All Statuses</option>
            {uniqueStatuses.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full justify-items-center">
        {filteredMaterials.map((material, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md border border-[#c4c4c4] overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] flex flex-col w-full max-w-sm"
          >
            <div className="bg-[#f3f3f3] p-3">{renderFilePreview(material.fileUrl)}</div>
            <div className="p-4 flex-grow flex flex-col justify-between text-sm">
              <div>
                <h3 className="text-lg font-semibold text-[#374258] mb-1">{material.title}</h3>
                <p className="text-[#6a7285] mb-1">📘 <strong>Module:</strong> {material.moduleId}</p>
                <p className="text-[#6a7285]">📝 {material.description}</p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-medium text-[#f74464]">{material.status}</span>
                <div className="flex gap-2">
                  <a
                    href={material.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-md text-sm bg-[#6a7285] hover:bg-[#374258] text-white transition"
                  >
                    Open
                  </a>
                  <a
                    href={material.fileUrl}
                    download
                    className="px-3 py-1.5 rounded-md text-sm bg-[#f74464] hover:bg-[#c9304e] text-white transition"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredMaterials.length === 0 && (
          <p className="text-center text-[#6a7285] col-span-full mt-6">
            No materials match your filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default StudyMaterials;
