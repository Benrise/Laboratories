import { Box, Heading, Text, Image, Stack, Spinner, Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { NextSeo } from "next-seo";

function EmployeeDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:8000/api/v1/persons/${id}`)
        .then(response => {
          setEmployee(response.data);
          setLoading(false);
        })
        .catch(error => {
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

  if (!employee) {
    return <Text>Сотрудник не найден.</Text>;
  }

  return (
    <Box p={4}>
      <NextSeo title={employee.full_name} description={`Информация о сотруднике ${employee.full_name}`} />
      <Image src='/img/miphi/miphi_profile.jpeg' alt={employee.full_name} width={256} height={256} />
      <Heading fontSize="2xl" mb={4}>{employee.full_name}</Heading>
      <Text fontSize="lg" mb={4}>{employee.description}</Text>
      {employee.laboratory_titles && employee.laboratory_titles.length > 0 && (
        <Text fontSize="md" mb={2}><strong>Лаборатории:</strong> {employee.laboratory_titles.join(", ")}</Text>
      )}
      <Divider my={4} />
      {employee.publications && employee.publications.length > 0 && (
        <>
          <Heading as="h3" fontSize="xl" mb={4}>Публикации</Heading>
          <Stack spacing={2}>
            {employee.publications.map((pub, index) => (
              <Text key={index}>{index + 1}. {pub}</Text>
            ))}
          </Stack>
        </>
      )}
    </Box>
  );
}

export default EmployeeDetail;
