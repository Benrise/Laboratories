import { Box, Heading, Text, Spinner, Image, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from 'next-mdx-remote/serialize';
import { format } from "@formkit/tempo";

function PublicationDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/api/v1/publications/${id}`)
        .then(async (response) => {
          const publication = response.data;
          if (publication.description) {
            const mdxSource = await serialize(publication.description);
            setPublication({ ...publication, mdxSource });
          } else {
            setPublication(publication);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Ошибка при получении данных:", error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!publication) {
    return <Text>Публикация не найдена.</Text>;
  }

  return (
    <Box
      p={16}
      gap={2}
      display="flex"
      flexDirection="column"
      style={{ marginTop: "2rem" }}
    >
      <Heading fontSize="2xl" mb={4} >
        {publication.name}
      </Heading>
      {publication.mdxSource ? (
        <Text style={{backgroundColor: "white", padding: "48px" , borderRadius: "8px"}}>
            <MDXRemote {...publication.mdxSource} />
        </Text>
      ) : (
        <Text style={{ whiteSpace: "pre-wrap", width: "100%", backgroundColor: "white", padding: "48px" , borderRadius: "8px"}}>
          {publication.description}
        </Text>
      )}
      <Text style={{backgroundColor: "white", padding: "48px" , borderRadius: "8px"}} color="gray">Авторы: {publication.authors}</Text>
      <Text style={{backgroundColor: "white", padding: "48px" , borderRadius: "8px"}} color="gray">Опубликовано: {publication.publication_date ? format(publication.publication_date, "DD.MM.YYYY") : "-"}</Text>
      <Button
        onClick={() => router.back()}
        style={{
          width: "100%",
          color: "black",
        }}
      >
        Назад к публикациям
      </Button>
    </Box>
  );
}

export default PublicationDetail;
