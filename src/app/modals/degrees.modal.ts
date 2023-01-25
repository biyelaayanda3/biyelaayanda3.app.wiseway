export class Degrees {
  constructor(
    public id: string,
    public title: string, // course
    public category: string, // Undergraduate
    public description: string, // degree - about
    public about: string,
    public image: string, // course
    public duration: string,
    public saqa: string,
    public nqf: string,
    public credits: string,
    public admissionRequirements: string[],
  ) {}
}

export interface ProgrammeStructure {
  yearOne: Semester;
  yearTwo: Semester;
  yearThree: Semester;
}

export interface Semester {
  semesterOne: string[];
  semesterTwo: string[];

}
