import { Box, Heading, Text, Stack, Badge, Divider, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "@formkit/tempo";
import activityTypeMapper from "../../utils/activityTypeMapper";

function LaboratoryDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [lab, setLab] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:8000/api/v1/laboratories/${id}`)
        .then(response => {
          setLab(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Ошибка при получении данных:", error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (!lab) {
    return <Text>Лаборатория не найдена.</Text>;
  }

  return (
    <Box p={4} pt={16}>
      <Heading fontSize="2xl" mb={4}>
        {lab.title}
      </Heading>
      <Stack direction="row" spacing={4} align="center" mb={4}>
        <Badge colorScheme="blue">{activityTypeMapper[lab.activity_type]}</Badge>
      </Stack>
      <Text fontSize="lg" mb={4}>
        {lab.description}
      </Text>
      {lab.heads && lab.heads.length > 0 && (
        <Text fontSize="md" mb={2}>
          <strong>Заведующие:</strong> {lab.heads.join(", ")}
        </Text>
      )}
      {lab.staffs && lab.staffs.length > 0 && (
        <Text fontSize="md" mb={2}>
          <strong>Сотрудники:</strong> {lab.staffs.join(", ")}
        </Text>
      )}
      {lab.interns && lab.interns.length > 0 && (
        <Text fontSize="md" mb={2}>
          <strong>Стажеры:</strong> {lab.interns.join(", ")}
        </Text>
      )}
      <Text fontSize="md" mb={2}>
        <strong>Основана:</strong> {format(lab.created_at, "DD.MM.YYYY")}
      </Text>
      {lab.publications && lab.publications.length > 0 && lab.publications[0] && (
        <>
          <Divider my={4} />
          <Stack direction="row" spacing={2} mt={2}>
            {lab.publications.map((pub, index) => (
              <Badge key={pub} colorScheme="purple">
                {index + 1}. {pub}
              </Badge>
            ))}
          </Stack>
        </>
      )}
    </Box>
  );
}

export default LaboratoryDetail;
