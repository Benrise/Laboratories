import { Box, Heading, Text, Image, Stack, Spinner, Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import { NextSeo } from "next-seo";
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect, useState } from 'react';

const EmployeeDetail = ({ employee, mdxSource }) => {
  const router = useRouter();

  if (router.isFallback) {
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

  const imageSrc = employee.photo ? `http://127.0.0.1:8000/${employee.photo}` : '/img/miphi/miphi_profile.jpeg';

  return (
    <Box p={32} gap={16} display="flex" flexDirection="row" flexWrap={"wrap"}>
      <Box gap={4} display="flex" flexDirection="column">
        <NextSeo title={employee.full_name} description={`Информация о сотруднике ${employee.full_name}`} />
        <Image src={imageSrc} border={"1px"} borderColor={"gray.200"} alt={employee.full_name} width={256} height={256} />
        <Heading fontSize="2xl" mb={4}>{employee.full_name}</Heading>
        {employee.laboratory_titles && employee.laboratory_titles.length > 0 && (
          <Text fontSize="md" mb={2}><strong>Лаборатории:</strong> {employee.laboratory_titles.join(", ")}</Text>
        )}
        <Divider my={4} />
        {!employee.publications && (
          <Text fontSize="md">Публикации отсутствуют</Text>
        )}
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
      <Box p={16} gap={2} display="flex" flexDirection="column" maxWidth={'70%'} style={{backgroundColor: "white", padding: "48px" , borderRadius: "8px"}}>
        <Heading as="h3" fontSize="xl" mb={4}>Информация о сотруднике</Heading>
        <MDXRemote {...mdxSource} />
      </Box>
    </Box>
  );
};

export default EmployeeDetail;

export async function getServerSideProps(context) {
  const { id } = context.params;
  let employee = null;
  let mdxSource = null;

  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/persons/${id}`);
    employee = response.data;

    if (employee.description) {
      mdxSource = await serialize(employee.description);
    }
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }

  return {
    props: {
      employee,
      mdxSource,
    },
  };
}
