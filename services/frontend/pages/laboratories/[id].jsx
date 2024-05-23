import { Box, Heading, Text, Stack, Badge, Divider, Spinner, Image, SimpleGrid, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "@formkit/tempo";
import activityTypeMapper from "../../utils/activityTypeMapper";
import { motion } from "framer-motion";

function LaboratoryDetail() {
  const MotionBox = motion(Box);
  const itemVariant = {
    start: { y: 20, opacity: 0 },
    end: { y: 0, opacity: 1 },
  };
  const router = useRouter();
  const { id } = router.query;
  const [lab, setLab] = useState(null);
  const [persons, setPersons] = useState(null);
  const [loading, setLoading] = useState(true);

  const imageSrc = (src) => {
    const imageSrc = src ? `http://127.0.0.1:8000/${src}` : '/img/miphi/miphi_profile.jpeg';
    return imageSrc;
  }

  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:8000/api/v1/laboratories/${id}`)
        .then(response => {
          setLab(response.data);
        })
        .catch(error => {
          console.error("Ошибка при получении данных:", error);
        });

      axios.get(`http://127.0.0.1:8000/api/v1/laboratories/${id}/persons`)
        .then(response => {
          setPersons(response.data);
        })
        .catch(error => {
          console.error("Ошибка при получении данных:", error);
        });

      setLoading(false);
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

  if (!lab) {
    return <Text>Лаборатория не найдена.</Text>;
  }

  const renderPerson = (person, type) => (
    <MotionBox
      as="a"
      backgroundColor="white"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      p="6"
      variants={itemVariant}
      borderWidth="1px"
      _hover={{ boxShadow: "md", cursor: "pointer" }}
      style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}
    >
      <Image src={imageSrc(person[2])} alt={person[1]} width={256} height={256}/>
      <Heading as="h4" fontSize="lg">
        {person[1]}
      </Heading>
      <Text>{type}</Text>
    </MotionBox>
  );

  return (
    <Box p={16} gap={4} display="flex" flexDirection="column">
      <Box p={16} gap={4} display="flex" flexDirection="row">
        <Image src={imageSrc(lab.photo)} border={"1px"} borderColor={"gray.200"} alt={lab.title} width={256} height={256} />
        <Box display="flex" flexDirection="column" gap={2}>
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
              <strong>Заведующие:</strong> {lab.heads.map((head) => head[1]).join(", ")}
            </Text>
          )}
          {lab.staffs && lab.staffs.length > 0 && (
            <Text fontSize="md" mb={2}>
              <strong>Сотрудники:</strong> {lab.staffs.map((staff) => staff[1]).join(", ")}
            </Text>
          )}
          {lab.interns && lab.interns.length > 0 && (
            <Text fontSize="md" mb={2}>
              <strong>Стажеры:</strong> {lab.interns.map((intern) => intern[1]).join(", ")}
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
      </Box>
      <Box p={16} gap={4} display="flex" flexDirection="column">
        <Heading as="h3" fontSize={{ base: "xl", lg: "2xl" }} mb="4">
          Сотрудники
        </Heading>
        {(!persons || (persons.heads.length === 0 && persons.interns.length === 0 && persons.staffs.length === 0)) && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="400"
            style={{ scrollSnapAlign: "start" }}
          >
            Отсутствуют данные о сотрудниках
          </Box>
        )}
        <SimpleGrid columns={{ base: 1, lg: 4 }} spacing={4}>
          {persons && persons.heads.map((head) => (
            <Link href={`/persons/${head[0]}`} passHref key={head[0]}>
              {renderPerson(head, 'Заведующий')}
            </Link>
          ))}
          {persons && persons.interns.map((intern) => (
            <Link href={`/persons/${intern[0]}`} passHref key={intern[0]}>
              {renderPerson(intern, 'Стажер')}
            </Link>
          ))}
          {persons && persons.staffs.map((staff) => (
            <Link href={`/persons/${staff[0]}`} passHref key={staff[0]}>
              {renderPerson(staff, 'Сотрудник')}
            </Link>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default LaboratoryDetail;
