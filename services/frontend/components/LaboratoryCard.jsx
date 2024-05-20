import { Box, Heading, Text, Stack, Badge, Divider } from "@chakra-ui/react";
import { format } from "@formkit/tempo"
import activityTypeMapper from "../utils/activityTypeMapper";
import React from "react";

function LaboratoryCard({ lab }) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      style={{ scrollSnapAlign: "start" }}
    >
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
        <strong>Заведующие:</strong> {lab.heads?.join(", ")}
      </Text>
      )}
        {lab.staffs && lab.staffs.length > 0 && (
        <Text fontSize="sm">
            <strong>Сотрудники:</strong> {lab.staffs?.join(", ") }
        </Text>
        )}
        {lab.interns && lab.interns.length > 0 && (
        <Text fontSize="sm">
          <strong>Стажеры:</strong>
          {lab.interns?.join(", ")}
        </Text>
        )}
        <Text fontSize="sm">
          <strong>Основана:</strong>
          {format(lab.created_at, "DD.MM.YYYY")}
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
  );
}

export default LaboratoryCard;
