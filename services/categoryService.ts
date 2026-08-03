


export const categoryService = {
    async getAllCategories(): Promise<Exam[]> {
        const response = await apiClient.get<ApiEnvelope<Exam[]>>('/api/exams', options);
        return response.data;
    },
}