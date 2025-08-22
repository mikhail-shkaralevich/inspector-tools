--
-- PostgreSQL database dump
--

\restrict EquyoMOa0UnJ9VdWhlONY9krxD4VDV9kU0p8AZgsQ6X0rJJAmoKieeKcr8Qw5AI

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    id integer NOT NULL,
    program character varying(100) NOT NULL,
    question_text text NOT NULL,
    options jsonb,
    correct_answer smallint NOT NULL,
    CONSTRAINT questions_correct_answer_check CHECK ((correct_answer >= 0))
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.questions_id_seq OWNER TO postgres;

--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questions (id, program, question_text, options, correct_answer) FROM stdin;
1	Asphalt Mixture Sampling	What is the minimum sample size for asphalt mixture?	["5 lbs", "10 lbs", "15 lbs", "20 lbs"]	3
2	Asphalt Mixture Sampling	What temperature range is ideal for asphalt sampling?	["200-250°F", "250-300°F", "300-350°F", "350-400°F"]	3
3	Concrete Sampling and Testing	What does ACI stand for?	["American Concrete Institute", "American Construction Industry", "Advanced Concrete Installation", "Architectural Concrete Institute"]	1
4	Concrete Sampling and Testing	What is the minimum concrete cover for rebar in exposed conditions?	["1 inch", "1.5 inches", "2 inches", "2.5 inches"]	3
5	Soil and Aggregate Sampling and Testing	What is the standard method for determining soil compaction?	["Sieve Analysis", "Atterberg Limits", "Proctor Test", "Hydrometer Test"]	3
6	Soil and Aggregate Sampling and Testing	What is the maximum size of aggregate typically tested in a standard sieve analysis?	["1/2 inch", "3/4 inch", "1 inch", "2 inches"]	2
7	Nuclear Gauge and E-gauge	What is the primary radioactive source used in nuclear density gauges?	["Cesium-137", "Cobalt-60", "Uranium-238", "Radon-222"]	1
8	Nuclear Gauge and E-gauge	What is the minimum safe distance for untrained personnel from an operating nuclear gauge?	["5 feet", "10 feet", "15 feet", "20 feet"]	3
\.


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questions_id_seq', 1, true);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict EquyoMOa0UnJ9VdWhlONY9krxD4VDV9kU0p8AZgsQ6X0rJJAmoKieeKcr8Qw5AI

