import { Box, Heading, Text, Stack, Badge, Divider, Image } from "@chakra-ui/react";
import { format } from "@formkit/tempo";
import activityTypeMapper from "../utils/activityTypeMapper";
import Link from 'next/link';
import React from "react";

function LaboratoryCard({ lab }) {

  const imageSrc = (src) => {
    const imageSrc = src ? `http://127.0.0.1:8000/${src}` : '/img/miphi/miphi_profile.jpeg';
    return imageSrc;
  }

  return (
    <Link href={`/laboratories/${lab.id}`} passHref>
      <Box
        as="a"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        style={{ scrollSnapAlign: "start" }}
        _hover={{ boxShadow: "md", cursor: "pointer" }}
      >
        <Image src={imageSrc(lab.photo)} alignSelf={"center"} alt={lab.title} width={256} height={256} />
        <Heading fontSize="xl" mb={2}>
          {lab.title}
        </Heading>
        <Stack direction="row" spacing={4} align="center" mb={2}>
          <Badge colorScheme="blue">{activityTypeMapper[lab.activity_type]}</Badge>
        </Stack>
        <Text fontSize="sm" mb={2}>
          {lab.description}
        </Text>
        {lab.heads && lab.heads.length > 0 && (
          <Text fontSize="sm">
            <strong>Заведующие:</strong> {lab.heads.join(", ")}
          </Text>
        )}
        {lab.staffs && lab.staffs.length > 0 && (
          <Text fontSize="sm">
            <strong>Сотрудники:</strong> {lab.staffs.join(", ")}
          </Text>
        )}
        {lab.interns && lab.interns.length > 0 && (
          <Text fontSize="sm">
            <strong>Стажеры:</strong> {lab.interns.join(", ")}
          </Text>
        )}
        <Text fontSize="sm">
          <strong>Основана:</strong> {format(lab.created_at, "DD.MM.YYYY")}
        </Text>
        {lab.publications && lab.publications.length > 0 && lab.publications[0] && (
          <React.Fragment>
            <Divider my={4} />
            <Stack direction="row" spacing={2} mt={2}>
              {lab.publications.map((pub, index) => (
                <Badge key={pub} colorScheme="purple">
                  {index + 1}. {pub}
                </Badge>
              ))}
            </Stack>
          </React.Fragment>
        )}
      </Box>
    </Link>
  );
}

export default LaboratoryCard;
