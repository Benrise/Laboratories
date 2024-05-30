import React, { useEffect, useState } from "react";
import { Box, Heading, Text, Spinner, Image, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

function NewsDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mdxSource, setMdxSource] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost/api/v1/news/${id}`)
        .then(async (response) => {
          setNews(response.data);
          if (response.data.content) {
            const mdx = await serialize(response.data.content);
            setMdxSource(mdx);
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

  if (!news) {
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
      {news.picture && (
        <Box
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Image
            src={`http://localhost${news.picture}`}
            border={"1px"}
            borderColor={"gray.200"}
            alt={news.picture}
            width="100%"
            height="50vh"
            objectFit="cover"
            borderRadius="30px"
          />
        </Box>
      )}

      <Heading fontSize="2xl" mb={4}>
        {news.title}
      </Heading>
      {mdxSource ? (
        <Box style={{ whiteSpace: "pre-wrap", width: "100%", backgroundColor: "white", padding: "48px" , borderRadius: "8px" }}>
          <MDXRemote {...mdxSource} />
        </Box>
      ) : (
        <Text style={{ whiteSpace: "pre-wrap", width: "100%", backgroundColor: "white", padding: "48px" , borderRadius: "8px" }}>
          {news.content}
        </Text>
      )}
      <Text color="gray" style={{backgroundColor: "white", padding: "48px" , borderRadius: "8px"}}>Авторы: {news.author}</Text>
      <Text color="gray" style={{backgroundColor: "white", padding: "48px" , borderRadius: "8px"}}>Добавлено: {news.created_at}</Text>
      <Link href={`/news`} passHref>
        <Button
          style={{
            width: "100%",
            color: "black",
          }}
        >
          Назад к публикациям
        </Button>
      </Link>
    </Box>
  );
}

export default NewsDetail;
