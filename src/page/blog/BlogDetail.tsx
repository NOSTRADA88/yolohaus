import { Helmet } from "react-helmet";
import { API_URL, slug } from "../../constants";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import { BlogDetailProps } from "../../interfaces";
import useBlogDetailPage from "../../hooks/useBlogDetailPage";
import convertDescriptionToElements from "../../utilts/convertDescriptionToElements";

const BlogDetail = ({ blogSlug }: BlogDetailProps) => {
  const { postData, isLoading, error } = useBlogDetailPage({
    blogSlug: blogSlug || "",
  });

  if (isLoading) {
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

  if (!postData) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="text- text-base font-museo">
          Данные недоступны. Пожалуйста, попробуйте позже.
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { title: "О компании", slug: slug.about },
    { title: "Блог", slug: slug.blog },
  ];

  return (
    <div>
      <Helmet>
        <title>{postData.metadata.title}</title>
        <meta name="description" content={postData.metadata.description} />
          <link rel="prefetch" href={`${API_URL}${postData.photo.url}`} as="image" type="image/webp"/>
      </Helmet>

      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <Breadcrumbs items={breadcrumbItems} finalTitle={postData.title} />
        <div className="mt-10">
          <div className="mb-8">
            {postData.photo && (
              <img
                src={`${API_URL}${postData.photo.url}`}
                alt={postData.photo.name}
                className="w-full h-[250px] object-cover object-center mb-4 "
              />
            )}
            <div className="py-2">
              {convertDescriptionToElements(postData.text)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
