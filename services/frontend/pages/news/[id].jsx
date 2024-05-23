import { Box, Heading, Text, Spinner, Image, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "../../components/Link";

function NewsDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost/api/v1/news/${id}`)
        .then((response) => {
          setNews(response.data);
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
      <Text style={{ whiteSpace: "pre-wrap", width: "100%" }}>
        {news.content}
      </Text>
      <Text color="gray">Автор: {news.author}</Text>
      <Text color="gray">Добавлено: {news.created_at}</Text>
      <Link
        route
        href={`/news`}
        fontWeight="bold"
        style={{ marginTop: "auto" }}
      >
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
