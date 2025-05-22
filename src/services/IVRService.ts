import { audioContents, ivrMenuStructure } from '../data/audioLibraryData';
import type { AudioContent } from '../types/audioTypes';

class IVRService {
  private currentMenu = 'mainMenu';
  private selectedCategory: string | null = null;
  private selectedContent: AudioContent | null = null;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.currentMenu = 'mainMenu';
    this.selectedCategory = null;
    this.selectedContent = null;
  }

  public getCurrentPrompt(): string {
    if (this.currentMenu === 'mainMenu') {
      return ivrMenuStructure.mainMenu.prompt;
    } else {
      return ivrMenuStructure.subMenus[this.currentMenu].prompt;
    }
  }

  public getAvailableOptions(): { [key: string]: string } {
    if (this.currentMenu === 'mainMenu') {
      return ivrMenuStructure.mainMenu.options;
    } else {
      return ivrMenuStructure.subMenus[this.currentMenu].options;
    }
  }

  public processInput(input: string): {
    success: boolean;
    message: string;
    category?: string;
    content?: AudioContent | null;
  } {
    const options = this.getAvailableOptions();

    if (!options[input]) {
      return {
        success: false,
        message: 'অবৈধ অপশন। অনুগ্রহ করে আবার চেষ্টা করুন।',
      };
    }

    const selection = options[input];

    // If returning to main menu
    if (selection === 'mainMenu') {
      this.currentMenu = 'mainMenu';
      this.selectedCategory = null;
      this.selectedContent = null;
      return {
        success: true,
        message: 'মূল মেনুতে ফিরে এসেছেন।',
      };
    }

    // If in main menu, selection is a category
    if (this.currentMenu === 'mainMenu') {
      this.currentMenu = selection;
      this.selectedCategory = selection;
      return {
        success: true,
        message: `${selection} বিভাগ নির্বাচিত হয়েছে।`,
        category: selection,
      };
    }

    // If in a category menu, selection is a content ID
    const contentId = selection;
    const categoryContents = audioContents[this.selectedCategory || ''];

    if (!categoryContents) {
      return {
        success: false,
        message: 'বিভাগে কোন কন্টেন্ট পাওয়া যায়নি।',
      };
    }

    const content = categoryContents.find((item) => item.id === contentId);

    if (!content) {
      return {
        success: false,
        message: 'কন্টেন্ট পাওয়া যায়নি।',
      };
    }

    this.selectedContent = content;

    return {
      success: true,
      message: `${content.title} নির্বাচিত হয়েছে।`,
      content: content,
      category: this.selectedCategory,
    };
  }

  public getSelectedContent(): AudioContent | null {
    return this.selectedContent;
  }

  public getSelectedCategory(): string | null {
    return this.selectedCategory;
  }
}

export default new IVRService();
