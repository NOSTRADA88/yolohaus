import {
  AboutHouses,
  OptionsHouses,
  SliderHouses,
} from "../../components/builtHouses";
import { Helmet } from "react-helmet";
import Technology from "../../components/projects/Technology";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import { useProjectDetails } from "../../hooks/useProjectDetails";
import { useInView } from "react-intersection-observer";
import {API_URL, slug} from "../../constants";
import { ProjectsDetailProps } from "../../interfaces";

const ProjectsDetail = ({
  projectsSlug,
  initialTechnology,
}: ProjectsDetailProps) => {
  const {
    loading,
    finalTitle,
    projectData,
    isLoading,
    error,
    isTechnologySelected,
    updateMetaData,
    handleTechnologySelect,
    intermediateTitle,
    minPriceForSelectedTechnology,
  } = useProjectDetails({ projectsSlug, initialTechnology });

  const { ref: refTechnology, inView: inViewTechnology } = useInView({
    triggerOnce: true,
  });
  const { ref: refAbout, inView: inViewAbout } = useInView({
    triggerOnce: true,
  });

  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="text-red-500 text-base font-museo">
          Произошла ошибка. Пожалуйста, попробуйте позже.
        </div>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="text- text-base font-museo">
          Данные недоступны. Пожалуйста, попробуйте позже.
        </div>
      </div>
    );
  }

  const breadcrumbItems = [{ title: "Проекты и цены", slug: slug.projects }];

  if (isTechnologySelected) {
    breadcrumbItems.push({
      title: intermediateTitle,
      slug: `${slug.projects}/${projectsSlug}`,
    });
  }

  return (
    <div>
      <Helmet>
        <title>{projectData.metadata.title}</title>
        <meta name="description" content={projectData.metadata.description} />
        {projectData.photos.map((photo,index) => (
            <link rel="prefetch" href={`${API_URL}${photo.url}`} as="image" key={index} type="image/webp"/>
        ))}
      </Helmet>
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <Breadcrumbs items={breadcrumbItems} finalTitle={finalTitle} />
        <div className="flex flex-col mt-20 max-xl:mt-10 max-sm:mt-5">
          <div className="flex justify-between max-lg:flex-col">
            <SliderHouses details={[projectData]} />
            <OptionsHouses
              details={[projectData]}
              minPrice={minPriceForSelectedTechnology}
            />
          </div>
          <h2 className="font-museo font-bold text-2xl max-md:text-xl text-maingray mt-10">
            Технология строительства
          </h2>
          <div ref={refTechnology}>
            {inViewTechnology && (
              <Technology
                updateMetaData={updateMetaData}
                complectations={projectData.kits || []}
                currentProjectSlug={projectsSlug}
                slugProjects={slug.projects}
                initialTechnology={initialTechnology}
                onTechnologySelect={handleTechnologySelect}
                isTechnologySelected={isTechnologySelected}
              />
            )}
          </div>
          <div ref={refAbout} className="mt-10">
            {inViewAbout && <AboutHouses details={[projectData]} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsDetail;
