import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProjects, Project } from "../../utils/projects";
import { getCurrentUser } from "../../utils/auth";
import Wrapper from "../Section/Common/Wrapper";
import ClientHeaderTemplate from "../templates/ClientDashboard/components/ClientHeaderTemplate";
import ProjectDetailsTemplate from "../templates/ClientDashboard/components/ProjectDetailsTemplate";
import FooterTemplate from "../templates/ClientDashboard/components/FooterTemplate";

const DynamicProjectDetails = () => {
    const { clientUrl, projectId } = useParams<{ clientUrl: string; projectId: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        const loadProject = async () => {
            const user = getCurrentUser();

            if (!clientUrl || !projectId) {
                setLoading(false);
                return;
            }

            const projects = await getAllProjects();
            const dashboardProject = projects.find(p =>
                p.type === 'client-dashboard' &&
                p.clientDashboardUrl === clientUrl
            );

            let selectedProject = projects.find(p => p.id === projectId);

            // If not found, use default project data
            if (!selectedProject) {
                const defaultProjects = [
                    { id: "1", name: "My E-commerce Store", url: "https://your-ecommerce-site.com", adminUrl: "https://your-ecommerce-site.com/admin", thumbnail: "/assets/images/portfolio/p_1.png", type: "ui branding", status: "completed", deadline: "Dec 31, 2024" },
                    { id: "2", name: "My Portfolio", url: "https://your-portfolio-site.com", adminUrl: "https://your-portfolio-site.com/cms", thumbnail: "/assets/images/portfolio/p_2.png", type: "ui website", status: "completed", deadline: "Dec 31, 2024" },
                    { id: "3", name: "Business Website", url: "https://your-business-site.com", adminUrl: "https://your-business-site.com/admin", thumbnail: "/assets/images/portfolio/p_3.png", type: "ui", status: "completed", deadline: "Dec 31, 2024" },
                    { id: "4", name: "My Blog", url: "https://your-blog-site.com", adminUrl: "https://your-blog-site.com/wp-admin", thumbnail: "/assets/images/portfolio/p_4.png", type: "ui branding website", status: "completed", deadline: "Dec 31, 2024" }
                ];
                selectedProject = defaultProjects.find(p => p.id === projectId) as Project;
            }

            // Check access
            if (user?.type === 'developer' && dashboardProject?.developerId === user.id) {
                setProject(selectedProject || null);
                setLoading(false);
                return;
            }

            if (user?.type === 'client' && dashboardProject?.clientId === user.id) {
                setProject(selectedProject || null);
                setLoading(false);
                return;
            }

            setShouldRedirect(true);
            setLoading(false);
        };

        loadProject();
    }, [clientUrl, projectId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (shouldRedirect) {
        return <Navigate to={`/client-dashboard/${clientUrl}`} replace />;
    }

    if (!project) {
        return <div>Project not found</div>;
    }

    const projectData = {
        id: project.id,
        name: project.name,
        thumbnail: project.thumbnail,
        siteUrl: project.url,
        adminUrl: project.adminUrl,
        developer: 'John Developer',
        status: project.status === 'published' ? 'Completed' : 'In Progress',
        deadline: project.deadline || 'December 31, 2024',
        notes: [
            {
                date: 'October 14, 2024',
                title: 'Homepage Updates Complete',
                message: 'The homepage has been updated with the new design. Please review and let me know if you need any changes.'
            },
            {
                date: 'October 10, 2024',
                title: 'New Features Added',
                message: 'Added contact form and newsletter signup. These are now live on your site.'
            }
        ],
        tasks: [
            { task: 'Homepage redesign', status: 'Completed', dueDate: 'Oct 10' },
            { task: 'Add contact form', status: 'Completed', dueDate: 'Oct 12' },
            { task: 'Blog section setup', status: 'In Progress', dueDate: 'Oct 20' },
            { task: 'SEO optimization', status: 'Pending', dueDate: 'Oct 25' }
        ],
        clientScore: {
            responseTime: 95,
            tasksCompleted: 8,
            totalTasks: 10,
            averageResponseDays: 1.5
        }
    };

    return (
        <Wrapper>
            <ClientHeaderTemplate clientName={project.name} dashboardUrl={clientUrl} />
            <ProjectDetailsTemplate projectData={projectData} dashboardUrl={clientUrl} />
            <FooterTemplate />
        </Wrapper>
    );
};

export default DynamicProjectDetails;
