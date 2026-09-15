import axios from 'axios';
import { Team, Match } from '@types/index';

const API_BASE_URL = 'https://api.obosligaen.no/api'; // Replace with actual API

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const leagueService = {
  async getStandings(): Promise<Team[]> {
    try {
      const response = await apiClient.get('/standings');
      return response.data;
    } catch (error) {
      console.error('Error fetching standings:', error);
      throw error;
    }
  },

  async getMatches(round?: number): Promise<Match[]> {
    try {
      const params = round ? { round } : {};
      const response = await apiClient.get('/matches', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching matches:', error);
      throw error;
    }
  },

  async getTeamDetails(teamId: string): Promise<Team> {
    try {
      const response = await apiClient.get(`/teams/${teamId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching team details:', error);
      throw error;
    }
  },

  async getTeamMatches(teamId: string): Promise<Match[]> {
    try {
      const response = await apiClient.get(`/teams/${teamId}/matches`);
      return response.data;
    } catch (error) {
      console.error('Error fetching team matches:', error);
      throw error;
    }
  },
};

export default apiClient;
